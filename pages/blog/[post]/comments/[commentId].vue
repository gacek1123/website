<script setup lang="ts">
import CommentList from '~/components/comments/CommentList.vue'
import useComments from '~/composables/useComments'

const { fetchComment } = useComments()

const commentId = useRoute().params.commentId as string

const comment = await fetchComment(commentId)

const comments = computed(() => comment.value ? [comment.value] : [])
</script>


<template>
    <div class="max-w-4xl w-full mx-auto mt-20 px-4">
        <CommentList :comments="comments"></CommentList>
    </div>
</template>