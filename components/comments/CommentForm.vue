<script setup lang="ts">
import { Button } from '@/components/ui/button'

import { Textarea } from '@/components/ui/textarea'

const { addComment } = useComments()

const content = ref('')

const postId = usePostId()

const onSubmit = () => {

    addComment(content.value, postId)
}

</script>

<template>
    <div class="">
        <Textarea placeholder="Type your message here." v-model="content" />

        <Button size="sm" class="mt-4" @click="onSubmit">Post</Button>
    </div>
</template>