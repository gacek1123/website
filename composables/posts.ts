import type { ListBlockChildrenResponse } from "@notionhq/client/build/src/api-endpoints"
import type { Post } from "~/lib/notion"

export const usePosts = () => {
    const posts = useState<Post[] | undefined>("posts", () => undefined)

    const fetchPosts = async () => {
        if (posts.value) return { posts: posts }

        const { data, error, status } = await useFetch("/api/notion/query-database")

        if (!data.value) return { error, status }

        posts.value = data.value

        return { posts, error, status }
    }


    return { fetchPosts, posts }
}


export const usePostBlocks = () => {
    const blocks = useState<Record<string, ListBlockChildrenResponse>>("blocks", () => ({}))

    const fetchBlocks = async (post_id: string) => {
        const block = post_id in blocks.value ? blocks.value[post_id] : undefined

        if (block && !block.has_more)
            return block

        const response = await $fetch<ListBlockChildrenResponse>(`/api/notion/blocks/${post_id}` + (block?.next_cursor ? `?start_cursor=${block.next_cursor}` : ''))

        if (!block) {
            blocks.value[post_id] = response

            return response
        }


        const { has_more, results, next_cursor } = response

        block.has_more = has_more
        block.next_cursor = next_cursor
        block.results.push(...results)

        return response
    }

    const getBlockById = (postId: string) => {
        return blocks.value[postId]
    }


    return {
        getBlockById,
        fetchBlocks
    }
}