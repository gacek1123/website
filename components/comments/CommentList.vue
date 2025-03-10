<script setup lang="ts">
import CommentItem from './CommentItem.vue'
import { type CachedComment } from '~/composables/useComment'

defineProps<{
    comments: CachedComment[]
}>()

</script>

<template>
    <div v-if="comments.length === 0" class="text-sm text-muted-foreground">
        No comments found
    </div>

    <div v-else class="w-full space-y-10">
        <CommentItem v-for="comment in comments" v-bind.prop="comment">
        </CommentItem>
    </div>

</template>