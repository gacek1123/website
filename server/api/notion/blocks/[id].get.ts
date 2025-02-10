import { Client } from "@notionhq/client";
import type { BlockObjectResponse, PartialBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({
    auth: process.env.NOTION_API_TOKEN,
    timeoutMs: 7000
});

export default cachedEventHandler((event) => {
    const pageId = event.context.params?.id as string;

    return fetchBlocks(pageId);
});

async function fetchBlocks(page_id: string) {
    const result: (PartialBlockObjectResponse | BlockObjectResponse)[] = [];
    let has_more = true;
    let cursor;

    while (has_more !== false) {
        const response = await notion.blocks.children.list({ block_id: page_id, page_size: 100, start_cursor: cursor });

        has_more = response.has_more;
        cursor = response.next_cursor || undefined;

        result.push(...response.results);
    }

    return result;
}