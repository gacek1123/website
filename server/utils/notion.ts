import { Client, isFullPage } from "@notionhq/client";
import type { SupportedRequestInfo, SupportedRequestInit } from "@notionhq/client/build/src/fetch-types";
import { parsePost, Post } from "~/shared/notion/post";

export const notion = new Client({
    auth: process.env.NOTION_API_TOKEN,
    timeoutMs: 7000,
    fetch: (url: SupportedRequestInfo, init?: SupportedRequestInit) => fetch(url, init)
});

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
