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
        const data = await $fetch<Comment[]>(`/api/blog/${postId}/comments/${commentId}/reply`)

        cacheComments(postId, ...data)
    }

    async function fetchComments(postId: string) {
        if (postId in commentsCache.value) {
            return commentsCache.value[postId]
        }

        const { data } = await useAsyncData<Comment[]>(`comments-${postId}`, async () => {

            const data = await $fetch<Comment[]>(`/api/blog/${postId}/comments`)

            cacheComments(postId, ...data)

            return data
        })

        return data.value
    }

    async function fetchComment(postId: string, commentId: string) {
        const { data } = useFetch(`/api/blog/${postId}/comments/${commentId}`)

        return data

    }


    function cacheComments(postId: string, ...comments: Comment[]) {
        const cachedComments = commentsCache.value[postId]

        if (cachedComments)
            cachedComments.push(...comments)
        else commentsCache.value[postId] = comments
    }


    async function addComment(content: string, postId: string) {
        const data = await $fetch<Comment>(`/api/blog/${postId}/comments`, {
            method: 'post',
            body: {
                content,

            }
        })

        cacheComments(postId, data)
    }

    async function addReply(content: string, commentId: number, postId: string) {
        const data = await $fetch<Comment>(`/api/blog/${postId}/comments/${commentId}/reply`, {
            method: 'post',
            body: {
                content,
            }
        })

        const comment = commentsCache.value[postId].find(({ id }) => commentId === id)
        if (comment) comment.replies++

        cacheComments(postId, data)
    }


    function commentsCount(postId: string) {
        return computed(() => commentsCache.value[postId]?.length ?? 0)
    }

    const order = useState<"asc" | "desc">("desc")

    function useSortedComments(comments: Ref<Comment[]>) {
        const sortedComments = computed(() => {
            return [...comments.value].sort((a, b) => {
                const dateA = new Date(a.createdAt).getTime()
                const dateB = new Date(b.createdAt).getTime()

                return order.value === "asc" ? dateA - dateB : dateB - dateA
            })
        })

        return sortedComments
    }


    return {
        fetchComments,
        getComments,
        addComment,
        addReply,
        getReplies,
        fetchReplies,
        commentsCount,
        useSortedComments,
        order,
        fetchComment
    }

}