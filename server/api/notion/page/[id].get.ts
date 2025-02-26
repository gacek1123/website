import { Client, isFullPage } from "@notionhq/client";
import { parsePost, Post } from '~/shared/notion/post';

export default cachedEventHandler(async (event) => {
    const id = getRouterParam(event, "id")
    if (!id) return createError({
        message: `"id" is required`
    })

    const response = await notion.pages.retrieve({
        page_id: id
    });

    if (isFullPage(response))
        return parsePost(response);


    throw createError({
        statusCode: 404
    })
}, {
    maxAge: 60 * 60 * 24,
    swr: true,
    shouldBypassCache(args_0) {
        return import.meta.dev ?? false
    },
});