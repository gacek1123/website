<script setup lang="ts">
import { Button } from '@/components/ui/button'

import { Textarea } from '@/components/ui/textarea'
import useComment from '~/composables/useComments'

const { loggedIn, openInPopup } = useUserSession()

const content = ref('')


const props = defineProps<{
    repliedCommentId?: number
}>()


const emit = defineEmits(["close"])

const { useAddReply, useAddComment } = useComment()

const { mutate } = props.repliedCommentId ? useAddReply(props.repliedCommentId) : useAddComment()


const onSubmit = async () => {
    mutate({ content: content.value })

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