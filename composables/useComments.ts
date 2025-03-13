import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/vue-query"
import type { Comment as CommentModel } from "~/server/utils/drizzle"
import { useToast } from '~/components/ui/toast'
import Button from "~/components/ui/button/Button.vue"

export type Comment = Omit<CommentModel, 'createdAt'> & { replies: number, createdAt: string, }

export default function useComments() {

    const postId = usePostId()

    const comments = useState<Comment[]>('comments', () => [])
    const replies = useState<Record<number, Comment[]>>('replies', () => ({}))

    const queryClient = useQueryClient()
    const { toast } = useToast()


    async function fetchComments() {
        const { data, suspense } = useQuery<Comment[]>({
            queryKey: ['comments', postId],
            queryFn: () => $fetch<Comment[]>(`/api/blog/${postId}/comments`),
        })

        await suspense()


        comments.value = data.value ? [...data.value] : []
    }

    const getReplies = (commentId: number) => computed(() => replies.value[commentId] ?? [])

    async function fetchReplies(commentId: number) {
        const postId = usePostId()

        const key = ['replies', commentId]

        const repliesCache = queryClient.getQueryData<Comment[]>(key)
        if (repliesCache) return repliesCache


        const data = await $fetch<Comment[]>(`/api/blog/${postId}/comments/${commentId}/reply`)

        queryClient.setQueryData<Comment[]>(key, data)

        replies.value[commentId] = data

        return data
    }

    function useAddReply(commentId: number) {
        return useMutation({
            mutationFn: (data: { content: string }) => $fetch<Comment>(`/api/blog/${postId}/comments/${commentId}/reply`, {
                method: 'post',
                body: data
            }),
            onError(error) {
                toast({
                    title: 'Uh oh! Something went wrong.',
                    variant: 'destructive',
                    description: 'Unable to add reply.',
                })
            },
            onSuccess(data) {
                queryClient.setQueryData<Comment[]>(['replies', commentId], (comments) => {
                    if (comments) return [...comments, data]
                })

                const repliesRef = replies.value[commentId] ??= []

                repliesRef.push(data)
            },

        })
    }

    function useAddComment() {
        return useMutation({
            mutationFn: (data: { content: string }) => $fetch<Comment>(`/api/blog/${postId}/comments`, {
                method: 'post',
                body: data
            }),
            onError(error) {
                console.error(error)

                toast({
                    title: 'Uh oh! Something went wrong.',
                    variant: 'destructive',
                    description: 'Unable to add comment.',
                })
            },

            onSuccess(data) {
                comments.value.push(data)

                queryClient.setQueryData<Comment[]>(['commments', postId], (comments) => {
                    if (comments) return [...comments, data]
                })


                const { dismiss } = toast({
                    title: 'Success!',
                    description: 'Your comment has been posted.',
                    action: h(Button, {
                        variant: 'outline',
                        size: 'sm',
                        onClick: () => {
                            const comment = document.querySelector(`#comment-${data.id}`)
                            if (comment)
                                comment.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
                        }
                    }, {
                        default: () => 'Show comment'
                    })
                })

                setTimeout(() => {
                    dismiss()
                }, 5000)
            }
        })
    }

    async function fetchComment(commentId: string) {
        const { data, suspense } = useQuery<Comment>({
            queryKey: ['comment', commentId],
            queryFn: () => $fetch<Comment>(`/api/blog/${postId}/comments/${commentId}`),
        })

        await suspense()

        if (data.value)
            comments.value.push(data.value)


    }

    const order = useState<"asc" | "desc">("desc")

    function commentsCount() {
        return computed(() => comments.value?.length ?? 0)
    }

    function useSortedComments() {
        const sortedComments = computed(() => {
            if (!comments.value) return []

            return [...comments.value].sort((a, b) => {
                const dateA = new Date(a.createdAt).getTime()
                const dateB = new Date(b.createdAt).getTime()

                return order.value === "asc" ? dateA - dateB : dateB - dateA
            })
        })

        return sortedComments
    }

    return {
        comments,
        replies,
        order,
        useSortedComments,
        commentsCount,
        fetchComments,
        fetchComment,
        useAddComment,
        useAddReply,
        fetchReplies,
        getReplies
    }

}