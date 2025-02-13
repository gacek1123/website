import { Client } from "@notionhq/client";

const notion = new Client({
    auth: process.env.NOTION_API_TOKEN,
    timeoutMs: 7000
});


export default cachedEventHandler(async (event) => {
    const pageId = getRouterParam(event, "id")
    if (!pageId) return createError({
        message: `"id" is required`
    })



    const query = getQuery(event)


    return notion.blocks.children.list({
        block_id: pageId, page_size: 50, start_cursor: query.start_cursor?.toString()
    });

});