import type { Comment as C } from "~/server/utils/drizzle"


type Comment = Omit<C, 'createdAt'> & { replies: number, createdAt: string, }
export type CachedComment = Comment & { comments: CachedComment[], depth: number }

export const useComments = () => {

    const commentsCache = useState<Record<string, CachedComment[]>>('comments', () => ({}))

    function getCommentUrl(comment: Comment | CachedComment): string {
        return `/blog/${comment.postId}/comments/${comment.id}`
    }

    function getRootComments(postId: string) {
        return commentsCache.value[postId].filter((comment) => comment.depth === 0) ?? []
    }

    function commentToCacheComment(comment: Comment, depth: number): CachedComment {
        return {
            ...comment,
            comments: [],
            depth,
            replies: comment.replies ?? 0
        }
    }

    function cacheComments(postId: string, ...comments: Comment[]) {
        if (!commentsCache.value[postId]) commentsCache.value[postId] = [];
        const cachedComments = commentsCache.value[postId];

        cachedComments.push(...comments.map((comment) => commentToCacheComment(comment, 0)))
    }


    function cacheReplies(postId: string, commentId: number, replies: Comment | Comment[]): boolean {

        const foundComment = findComment(postId, commentId)
        if (!foundComment) return false

        if (Array.isArray(replies)) {
            const cacheReplies = replies.map((rep) => commentToCacheComment(rep, foundComment.depth + 1))
            foundComment.comments = cacheReplies

            return true
        }

        foundComment.comments.push(commentToCacheComment(replies, foundComment.depth + 1))

        foundComment.replies++
        return true
    }

    function findComment(postId: string, commentId: number) {
        const comments = commentsCache.value[postId]
        if (!comments) return null

        let stack = [...comments];

        while (stack.length > 0) {
            let node = stack.pop();

            if (!node) continue

            if (node.id === commentId) return node;
            if (node.comments) {
                for (let i = node.comments.length - 1; i >= 0; i--) {
                    stack.push(node.comments[i]);
                }
            }
        }

        return null;
    }


    async function fetchReplies(commentId: number, postId: string) {
        const data = await $fetch<Comment[]>(`/api/blog/${postId}/comments/${commentId}/reply`)

        cacheReplies(postId, commentId, data)
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
        if (postId in commentsCache.value) {
            return commentsCache.value[postId]
        }

        const { data } = await useAsyncData<Comment>(`comment-${postId}`, async () => {

            const data = await $fetch<Comment>(`/api/blog/${postId}/comments/${commentId}`)

            cacheComments(postId, data)

            return data
        })

        return data.value

    }


    async function addComment(content: string, postId: string) {
        const data = await $fetch<Comment>(`/api/blog/${postId}/comments`, {
            method: 'post',
            body: {
                content,

            }
        })

        cacheComments(postId, data)

        return data
    }

    async function addReply(content: string, commentId: number, postId: string) {
        const data = await $fetch<Comment>(`/api/blog/${postId}/comments/${commentId}/reply`, {
            method: 'post',
            body: {
                content,
            }
        })

        cacheReplies(postId, commentId, data)

        return data
    }


    function commentsCount(postId: string) {
        return computed(() => commentsCache.value[postId]?.length ?? 0)
    }

    const order = useState<"asc" | "desc">("desc")

    function useSortedComments(comments: Ref<CachedComment[]>) {
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
        getRootComments,
        addComment,
        addReply,
        fetchReplies,
        commentsCount,
        useSortedComments,
        order,
        fetchComment,
        getCommentUrl
    }

}