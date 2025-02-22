
import { Client, isFullPage } from "@notionhq/client";
import type { BlockObjectResponse, PageObjectResponse, RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";
import type { SupportedRequestInfo, SupportedRequestInit } from "@notionhq/client/build/src/fetch-types";

export const notion = new Client({
    auth: process.env.NOTION_API_TOKEN,
    timeoutMs: 7000,
    fetch: (url: SupportedRequestInfo, init?: SupportedRequestInit) => fetch(url, init)
});



export type NotionColors = RichTextItemResponse['annotations']['color']

export function notionColorToCss(color: NotionColors): string {
    const colors: Record<NotionColors, string> = {
        default: '',
        gray: 'color: #6b7280',
        brown: 'color: #9a3412',
        orange: 'color: #f97316',
        yellow: 'color: #eab308',
        green: 'color: #22c55e',
        blue: 'color: #3b82f6',
        purple: 'color: #a855f7',
        pink: 'color: #ec4899',
        red: 'color: #ef4444',
        gray_background: 'background-color: #6b7280',
        brown_background: 'background-color: #9a3412',
        orange_background: 'background-color: #f97316',
        yellow_background: 'background-color: #eab308',
        green_background: 'background-color: #22c55e',
        blue_background: 'background-color: #3b82f6',
        purple_background: 'background-color: #a855f7',
        pink_background: 'background-color: #ec4899',
        red_background: 'background-color: #ef4444',
    }


    return colors[color]
}

export type Post = { title: string, image: string, url: string, createdAt: string, tags: any[], id: string, description: string, lastEditedTime: string }

export function isType<T extends BlockObjectResponse, U extends T["type"]>(
    block: T,
    ...types: U[]
): block is T & { type: U } {
    for (let t of types) if (t === block.type) return true

    return false
}

export function parsePost(result: PageObjectResponse): Post {
    const { Title, Description, Tags, URL: Url, Published, ["Cover image"]: CoverImage } = result.properties

    return {
        tags: getProperty(Tags, "multi_select") || [],
        image: getTextProperty(CoverImage),
        title: getTextProperty(Title),
        description: getTextProperty(Description),
        url: getTextProperty(Url),
        createdAt: getTextProperty(Published),
        id: result.id,
        lastEditedTime: result.last_edited_time
    }
}

export function getBlocks(block_id: string, start_cursor: string | undefined = undefined) {
    return notion.blocks.children.list({
        block_id,
        page_size: 50, start_cursor
    });
}

export async function getPages(size?: number) {
    const response = await notion.databases.query({
        database_id: process.env.NOTION_POST_DATABASE as string,
        filter: {
            property: "Status",
            status: {
                equals: "Published"
            }
        },
        sorts: [
            {
                property: "Published",
                direction: "descending"
            }
        ],
        page_size: size
    });

    return response.results.filter((result) => isFullPage(result)).map<Post>(parsePost);
}

type TextPropertyType = "rich_text" | "title" | "url" | "created_time"

const allowedTypes = new Set(["rich_text", "title", "url", "created_time"])

export function isText(type: Property["type"]): type is TextPropertyType {
    return allowedTypes.has(type)
}

export function getTextProperty(prop: Property): string {

    if (!isText(prop.type)) return ""

    const res = getProperty(prop, prop.type)

    if (!res) return ""

    if (Array.isArray(res))
        return res[0].plain_text


    return res
}

type Property = PageObjectResponse["properties"][string]

type _Combine<T, K extends PropertyKey = T extends unknown ? keyof T : never> =
    T extends unknown ? T & Partial<Record<Exclude<K, keyof T>, never>> : never;

type Combine<T> = { [K in keyof _Combine<T>]: _Combine<T>[K] }

export function getProperty<K extends keyof Combine<Property>>(prop: Combine<Property> | undefined, type: K) {
    if (!prop) return

    if (type in prop)
        return prop[type]
}

