<script setup lang="ts">
import { Button } from '@/components/ui/button'

import { Textarea } from '@/components/ui/textarea'

const { loggedIn, openInPopup } = useUserSession()

const { addComment, addReply } = useComments()

const content = ref('')

const postId = usePostId()

const props = defineProps<{
    repliedCommentId?: number
}>()

const onSubmit = () => {
    if (props.repliedCommentId) {
        addReply(content.value, props.repliedCommentId, postId)

        return
    }

    content.value = ''


    addComment(content.value, postId)
}

const emit = defineEmits(["close"])
</script>

<template>
    <div class="relative">
        <div class="absolute inset-0 flex items-center justify-center rounded-lg bg-black/5 backdrop-blur-[0.8px]"
            v-if="!loggedIn">
            <Button @click="openInPopup('/api/auth/github')" size="sm">Log in to comment</Button>
        </div>

        <Textarea :placeholder="repliedCommentId ? 'Type your reply here.' : 'Type your message here.'"
            v-model="content" />

        <div class="flex items-center gap-x-3 mt-4">
            <Button v-if="loggedIn" size="sm" @click="onSubmit">Post</Button>
            <Button size="sm" variant="outline" v-if="repliedCommentId" @click="emit('close')">Cancel</Button>
        </div>


    </div>
</template>