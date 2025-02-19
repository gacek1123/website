import { getBlocks } from "~/lib/notion";
import type { H3Event } from 'h3'


export default cachedEventHandler(async (event) => {
    const pageId = getRouterParam(event, "id")
    if (!pageId) return createError({
        message: `"id" is required`
    })

    const query = getQuery(event)

    return getBlocks(pageId, query.start_cursor?.toString())
}, {
    maxAge: 60 * 60 * 24,
    swr: true,
});

