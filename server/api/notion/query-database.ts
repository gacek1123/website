import { getPages } from "~/lib/notion";
import type { H3Event } from 'h3'

export default cachedEventHandler(async (event) => {
    return getPages()
}, {
    maxAge: 60 * 60 * 24,
    swr: true,
    getKey: (event: H3Event) => event.path
});

