import { Client, isFullPage } from "@notionhq/client";
import {  PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export default cachedEventHandler(async (event) => {
    const query = getQuery(event as any);

    const notion = new Client({
        auth: process.env.NOTION_API_TOKEN,
        timeoutMs: 7000
    });

    const size = query.size?.toString();
    const start_cursor = query.start_cursor?.toString()

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
        start_cursor: start_cursor,
        page_size: size ? parseInt(size) : undefined
    });


    return response.results.filter((result) => isFullPage(result)).map((result) => {
        const { Title, Description, Tags, URL: Url, Published, ["Cover image"]: CoverImage } = result.properties

        return {
            tags: getProperty(Tags, "multi_select") || [],
            image: getTextProperty(CoverImage),
            title: getTextProperty(Title),
            description: getTextProperty(Description),
            url: getTextProperty(Url),
            createdAt: getTextProperty(Published),
            id: result.id
        }
    });
});

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

