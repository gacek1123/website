import { getPages } from "~/lib/notion";
import type { H3Event } from 'h3'

export default defineEventHandler(async (event) => {
    return getPages()
});

