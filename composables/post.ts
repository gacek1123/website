import type { ListBlockChildrenResponse } from "@notionhq/client/build/src/api-endpoints"
import type { Post } from "~/shared/notion/post"
import { useQuery } from '@tanstack/vue-query'

export const usePostId = () => {
    const route = useRoute();
    const postId = route.params.post as string

    return postId
}

export async function usePost(postId: string) {
    const { data, suspense } = useQuery({
        queryKey: [`posts`, postId],
        queryFn: () => $fetch<Post>(`/api/notion/page/${postId}`),
    })

    await suspense()

    return data
}

export async function usePosts() {
    const { data, suspense } = useQuery({
        queryKey: ['posts'],
        queryFn: () => $fetch<Post[]>('/api/notion/query-database')
    })

    await suspense()

    return data
}

export function fetchBlocks({
    postId,
    nextCursor
}: { postId: string, nextCursor?: string }) {
    return $fetch<ListBlockChildrenResponse>(`/api/notion/blocks/${postId}`, {
        params: nextCursor ? { start_cursor: nextCursor } : {}
    });

}