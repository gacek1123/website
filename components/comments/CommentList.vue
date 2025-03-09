<script setup lang="ts">
import CommentItem from './CommentItem.vue'

const props = defineProps<{
    repliedCommentId?: number
}>()

const postId = usePostId()

const { fetchComments, getComments, getReplies } = useComments()

if (!props.repliedCommentId)
    await fetchComments(postId)

const comments = computed(() => props.repliedCommentId ? getReplies(postId, props.repliedCommentId) : getComments(postId))
</script>

<template>
    <div v-if="!comments">
        No comments found
    </div>

    <div v-else class="w-full space-y-10">
        <CommentItem v-for="comment in comments" v-bind.prop="comment"></CommentItem>
    </div>

</template>