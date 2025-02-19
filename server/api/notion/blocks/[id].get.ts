import { getBlocks } from "~/lib/notion";
import type { H3Event } from 'h3'
import { BlockObjectResponse, ListBlockChildrenResponse, PartialBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";


export default defineEventHandler(async (event) => {
    const pageId = getRouterParam(event, "id")
    if (!pageId) return createError({
        message: `"id" is required`
    })

    const query = getQuery(event)

    let startCursor = query.start_cursor?.toString()
    let hasMore = true
    let blocks: Array<PartialBlockObjectResponse | BlockObjectResponse> = []

    do {
        const data = await cachedBlocks(pageId, startCursor)

        blocks.push(...data.results)
        hasMore = data.has_more
        startCursor = data.next_cursor || undefined
    }
    while (hasMore && await isCached(pageId, startCursor))

    return {
        next_cursor: startCursor,
        has_more: hasMore,
        results: blocks
    } as ListBlockChildrenResponse
});

const cachedBlocks = defineCachedFunction(async (pageId: string, startCursor: string | undefined) => {
    const blocks = await getBlocks(pageId, startCursor)

    return blocks
}, {
    maxAge: 60 * 60 * 24,
    swr: true,
    name: 'postBlocks',
    getKey: (pageId: string, startCursor: string | undefined) => `${pageId}${startCursor ? `-${startCursor}` : ''}`
})


const isCached = (pageId: string, startCursor: string | undefined) => {
    return useStorage('cache').hasItem(`nitro:functions:postBlocks:${`${pageId}${startCursor ? `-${startCursor}` : ''}`}.json`)
}