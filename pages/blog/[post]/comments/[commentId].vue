<script setup lang="ts">
import CommentList from '~/components/comments/CommentList.vue'
const { fetchComment, getRootComments, useSortedComments } = useComments()


const postId = usePostId()

const commentId = useRoute().params.commentId as string

await fetchComment(postId, commentId)

const comments = computed(() => getRootComments(postId))

const sortedComments = useSortedComments(comments)
</script>


<template>
    <div class="max-w-4xl w-full mx-auto mt-20 px-4">
        <CommentList :comments="sortedComments"></CommentList>
    </div>
</template>