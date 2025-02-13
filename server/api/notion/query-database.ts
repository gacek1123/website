import { getPages } from "~/lib/notion";


export default cachedEventHandler(async (event) => {
    return getPages()
});

