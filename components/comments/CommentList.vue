<script setup lang="ts">
import CommentItem from './CommentItem.vue'

const postId = usePostId()

const { fetchComments, getComments } = useComments()

await fetchComments(postId)

const comments = getComments(postId)
</script>

<template>
    <div v-if="!comments">
        No comments found
    </div>

    <div v-else class="w-full space-y-10">
        <CommentItem v-for="comment in comments" v-bind="comment"></CommentItem>
    </div>

</template>