
import { Client, isFullPage } from "@notionhq/client";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({
    auth: process.env.NOTION_API_TOKEN,
    timeoutMs: 7000
});

export type Post = { title: string, image: string, url: string, createdAt: string, tags: any[], id: string, description: string, lastEditedTime: string }

export function getBlocks(block_id: string, start_cursor: string | undefined = undefined) {
    return notion.blocks.children.list({
        block_id, page_size: 50, start_cursor
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

    console.log(response)

    return response.results.filter((result) => isFullPage(result)).map<Post>((result) => {
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
    });
}

type TextPropertyType = "rich_text" | "title" | "url" | "created_time"

const allowedTypes = new Set(["rich_text", "title", "url", "created_time"])

function isText(type: Property["type"]): type is TextPropertyType {

    if (!allowedTypes.has(type)) return false

    return true
}

function getTextProperty(prop: Property): string {

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

function getProperty<K extends keyof Combine<Property>>(prop: Combine<Property> | undefined, type: K) {
    if (!prop) return

    if (type in prop)
        return prop[type]
}

