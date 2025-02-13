import { Client } from "@notionhq/client";
import { getBlocks } from "~/lib/notion";



export default cachedEventHandler(async (event) => {
    const pageId = getRouterParam(event, "id")
    if (!pageId) return createError({
        message: `"id" is required`
    })

    const query = getQuery(event)

    return getBlocks(pageId, query.start_cursor?.toString())
});

