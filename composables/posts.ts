import type { ListBlockChildrenResponse } from "@notionhq/client/build/src/api-endpoints"
import type { Post } from "~/lib/notion"
import { createStorage } from "unstorage";
import lruCacheDriver from "unstorage/drivers/lru-cache";

const blockStorage = createStorage({
    driver: lruCacheDriver({
    }),
});

export const usePosts = () => {
    const posts = useState<Post[] | undefined>("posts", () => undefined)

    const fetchPosts = async () => {
        if (posts.value) return { posts: posts }

        const { data, error, status } = await useFetch("/api/notion/query-database")

        if (!data.value) return { error, status }

        posts.value = data.value

        return { posts, error, status }
    }

    const fetchPost = async (postId: string) => {
        return $fetch<Post>("/api/notion/page/" + postId)
    }


    const latestPosts = computed(() => posts?.value ? posts.value.slice(0, 2) : [])

    return { fetchPosts, posts, fetchPost, latestPosts }
}


export const usePostBlocks = () => {
    const fetchBlocks = async (postId: string, block?: Ref<ListBlockChildrenResponse | null>): Promise<ListBlockChildrenResponse | null> => {

        if (!block?.value) {
            const block = await getBlockById(postId)
            if (block) return block
        }

        if (block?.value && !block.value.has_more)
            return block?.value

        const response = await $fetch<ListBlockChildrenResponse>(`/api/notion/blocks/${postId}` + (block?.value?.next_cursor ? `?start_cursor=${block.value.next_cursor}` : ''))

        if (!block) {
            blockStorage.set(postId, response)

            return response
        }

        if (!block.value)
            block.value = response

        const { has_more, results, next_cursor } = response

        block.value.has_more = has_more
        block.value.next_cursor = next_cursor
        block.value.results.push(...results)

        await blockStorage.set(postId, block.value)

        return response
    }

    const getBlockById = (postId: string) => blockStorage.get<ListBlockChildrenResponse>(postId)


    return {
        getBlockById,
        fetchBlocks
    }
}