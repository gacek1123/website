import type { Comment as C } from "~/server/utils/drizzle"

export type Comment = C & { replies: number, createdAt: string }

export const useComments = () => {

    const commentsCache = useState<Record<string, Comment[]>>('comments', () => ({}))

    function isReply(comment: Comment): boolean {
        return comment.repliedCommentId !== null
    }

    function getComments(postId: string) {
        return commentsCache.value[postId].filter((comment) => !isReply(comment)) ?? []
    }

    function getReplies(postId: string, commentId: number) {
        return commentsCache.value[postId].filter(comment => comment.repliedCommentId === commentId)
    }

    const fetchReplies = async (commentId: number, postId: string) => {
        const data = await $fetch<Comment[]>(`/api/comments/${commentId}/reply`)

        cacheComments(postId, ...data)
    }

    async function fetchComments(postId: string) {
        const { data } = await useAsyncData<Comment[]>('comments', async () => {

            const data = await $fetch<Comment[]>(`/api/comments/${postId}`)

            cacheComments(postId, ...data)

            return data
        })

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

    async function addReply(content: string, commentId: number, postId: string) {
        const data = await $fetch<Comment>(`/api/comments/${commentId}/reply`, {
            method: 'post',
            body: {
                content,
                postId,
            }
        })

        cacheComments(postId, data)
    }


    return {
        fetchComments,
        getComments,
        addComment,
        addReply,
        getReplies,
        fetchReplies
    }

}