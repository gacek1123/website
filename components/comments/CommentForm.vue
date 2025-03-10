<script setup lang="ts">
import { Button } from '@/components/ui/button'

import { Textarea } from '@/components/ui/textarea'
import { useToast } from '../ui/toast'

const { loggedIn, openInPopup } = useUserSession()

const { addComment, addReply } = useComments()

const content = ref('')

const postId = usePostId()

const props = defineProps<{
    repliedCommentId?: number
}>()


const emit = defineEmits(["close"])

const router = useRouter()
const { toast } = useToast()


const onSubmit = async () => {
    try {

        const { id } = props.repliedCommentId ? await addReply(content.value, props.repliedCommentId, postId) : await addComment(content.value, postId)


        const { dismiss } = toast({
            title: 'Success!',
            description: 'Your comment has been posted.',
            action: h(Button, {
                variant: 'outline',
                size: 'sm',
                onClick: () => {
                    const comment = document.querySelector(`#comment-${id}`)
                    if (comment)
                        comment.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });

                    router.push({
                        query: {
                            commentId: id
                        }
                    })



                }
            }, {
                default: () => 'Show comment'
            })
        })
        setTimeout(() => {

            dismiss()

            router.push({
                query: {
                }
            })
        }, 5000)

    } catch (err) {
        toast({
            title: 'Uh oh! Something went wrong.',
            variant: 'destructive',
            description: 'Unable to add comment.',
        })
    }


    emit('close')
    content.value = ''

}

</script>

<template>

    <div class="mb-10">
        <div class="relative">
            <div class="absolute inset-0 flex items-center justify-center rounded-lg bg-black/5 backdrop-blur-[0.8px]"
                v-if="!loggedIn && !repliedCommentId">
                <Button @click="openInPopup('/api/auth/github')" size="sm">Log in to comment</Button>
            </div>

            <Textarea :placeholder="repliedCommentId ? 'Type your reply here.' : 'Type your message here.'"
                v-model="content" />

            <div class="flex items-center gap-x-3 mt-4" v-if="loggedIn || repliedCommentId">
                <Button v-if="loggedIn" size="sm" @click="onSubmit">Post</Button>
                <Button size="sm" variant="outline" v-if="repliedCommentId" @click="emit('close')">Cancel</Button>
            </div>
        </div>
    </div>
</template>