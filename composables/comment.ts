import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/vue-query"
import type { Comment as CommentModel } from "~/server/utils/drizzle"
import { useToast } from '~/components/ui/toast'
import Button from "~/components/ui/button/Button.vue"

export type Comment = Omit<CommentModel, 'createdAt'> & { replies: number, createdAt: string, }

export async function addComment(content: string, postId: string) {

    const { toast } = useToast()

    const { isPending, isError, error, isSuccess, mutate } = useMutation({
        mutationFn: (data: { content: string }) => $fetch<Comment>(`/api/blog/${postId}/comments`, {
            method: 'post',
            body: data
        }),
        onError(error) {
            toast({
                title: 'Uh oh! Something went wrong.',
                variant: 'destructive',
                description: 'Unable to add comment.',
            })
        },

        onSuccess(data) {
            const queryClient = useQueryClient()

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


    await mutate({ content })

    return { isError, isPending, error, isSuccess }
}


export async function addReply(content: string, commentId: number, postId: string) {
    const { isPending, isError, error, isSuccess, mutate } = useMutation({
        mutationFn: (data: { content: string }) => $fetch<Comment>(`/api/blog/${postId}/comments/${commentId}/reply`, {
            method: 'post',
            body: {
                content,
            }
        }),
        onSuccess(data) {
            const queryClient = useQueryClient()

            queryClient.setQueryData<Comment[]>(['replies', commentId], (comments) => {
                if (comments) return [...comments, data]
            })
        },

    })


    await mutate({ content })

    return { isError, isPending, error, isSuccess }
}

export async function useReplies(queryClient: QueryClient, commentId: number) {
    const postId = usePostId()

    const key = ['replies', commentId]

    const replies = queryClient.getQueryData<Comment[]>(key)
    if (replies) return replies


    const data = await $fetch<Comment[]>(`/api/blog/${postId}/comments/${commentId}/reply`)

    queryClient.setQueryData<Comment[]>(key, data)

    return data
}



export async function useComments(postId: string) {
    const comments = useState<Comment[]>('comments', () => [])

    async function fetchComments() {
        const { data, suspense } = useQuery<Comment[]>({
            queryKey: ['comments', postId],
            queryFn: () => $fetch<Comment[]>(`/api/blog/${postId}/comments`),
        })

        await suspense()


        comments.value = data.value ?? []
    }

    async function fetchComment(postId: string, commentId: string) {
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
        useSortedComments,
        commentsCount,
        order,
        fetchComments,
        fetchComment
    }

}