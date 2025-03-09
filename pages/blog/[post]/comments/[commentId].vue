<script setup lang="ts">

import CommentItem from '~/components/comments/CommentItem.vue';

const { fetchComment } = useComments()


const postId = usePostId()

const commentId = useRoute().params.commentId as string

const comment = await fetchComment(postId, commentId)
</script>


<template>
    <div v-if="comment" class="max-w-4xl w-full mx-auto mt-20 px-4">
        <CommentItem v-bind.prop="comment"></CommentItem>
    </div>
</template>