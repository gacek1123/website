import type { ListBlockChildrenResponse } from "@notionhq/client/build/src/api-endpoints"

export type Post = { title: string, image: string, url: string, createdAt: string, tags: any[], id: string }

export const usePosts = () => {
    const posts = useState<Post[] | undefined>("posts", () => undefined)

    const fetchPosts = async () => {
        if (posts.value) return { posts: posts }

        const { data, error, status } = await useFetch("/api/notion/query-database")

        if (!data.value) return { error, status }

        posts.value = data.value

        return { posts, error, status }
    }

    const fetchBlocks = async (post_id: string, start_cursor: string | undefined = undefined) => {
        return $fetch<ListBlockChildrenResponse>(`/api/notion/blocks/${post_id}` + (start_cursor ? `?start_cursor=${start_cursor}` : ''))
    }

    return { fetchPosts, posts, fetchBlocks }
}