import { Client, isFullPage, isFullPageOrDatabase } from "@notionhq/client";
import { DatabaseObjectResponse, PageObjectResponse, } from "@notionhq/client/build/src/api-endpoints";

export default cachedEventHandler(async (event) => {
    const query = getQuery(event as any);

    const notion = new Client({
        auth: process.env.NOTION_API_TOKEN,
        timeoutMs: 7000
    });

    const size = query.size?.toString();
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
        page_size: size ? parseInt(size) : undefined
    });

    return response.results.map((result) => {
        if (isFullPage(result)) {
            const { Title, Description, Tags, URL: Url, Published } = result.properties


            return {
                title: getProperty(Title, "title")?.[0].plain_text,
                description: getProperty(Description, "rich_text")?.[0].plain_text,
                tags: getProperty(Tags, "multi_select"),
                url: getProperty(Url, "url"),
                image: getProperty(result.properties["Cover image"], "rich_text")?.[0].plain_text,
                createdAt: getProperty(Published, "created_time")
            }
        }


    });
});

type Property = PageObjectResponse["properties"][string]

type _Combine<T, K extends PropertyKey = T extends unknown ? keyof T : never> =
    T extends unknown ? T & Partial<Record<Exclude<K, keyof T>, never>> : never;

type Combine<T> = { [K in keyof _Combine<T>]: _Combine<T>[K] }

function getProperty<K extends keyof Combine<Property>>(prop: Combine<Property> | undefined, type: K) {
    if (!prop) return

    if (type in prop)
        return prop[type]
}

