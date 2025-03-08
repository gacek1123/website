import type { Comment as C } from "~/server/utils/drizzle"

type Comment = C & { replies: number }

export const useComments = () => {

    const commentsCache = useState<Record<string, Comment[]>>('comments', () => ({}))


    function getComments(postId: string) {
        return commentsCache.value[postId] ?? []
    }

    async function fetchComments(postId: string) {
        const { data } = await useFetch<Comment[]>(`/api/comments/${postId}`)

        if (data.value) {
            cacheComments(postId, ...data.value)
        }

        return data
    }

    function cacheComments(postId: string, ...comments: Comment[]) {
        const cachedComments = commentsCache.value[postId]

        if (cachedComments)
            cachedComments.push(...comments)
        else commentsCache.value[postId] = comments
    }


    async function addComment(content: string, postId: string) {
        const data = await $fetch<Comment>(`/api/comments/${postId}`, {
            method: 'post',
            body: {
                content,

            }
        })

        cacheComments(postId, data)

    }


    return {
        fetchComments,
        getComments,
        addComment
    }

}