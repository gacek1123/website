<script setup lang="ts">
import CommentItem from './CommentItem.vue'
import { type Comment } from '~/composables/useComments'

withDefaults(
    defineProps<{
        depth?: number,
        comments: Comment[]
    }>(), {
    depth: 0
})

</script>
<template>
    <div v-if="comments.length === 0" class="text-sm text-muted-foreground">
        No comments found
    </div>

    <div v-else class="w-full space-y-10">
        <CommentItem v-for="comment in comments" v-bind.prop="comment" :depth="depth" :key="comment.id">
        </CommentItem>
    </div>

</template>