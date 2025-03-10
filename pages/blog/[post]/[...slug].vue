<script setup lang="ts">
import CommentForm from '~/components/comments/CommentForm.vue'
import CommentList from '~/components/comments/CommentList.vue'
import CommentHeader from '~/components/comments/CommentHeader.vue';

import { useFormattedDate } from '~/composables/useDate';


const { fetchPost } = usePosts();

definePageMeta({
    alias: [
        '/blog/:post()/:slug(.*)*',
        '/page/:post()/:slug(.*)*'
    ]
})

const postId = usePostId()

const { data: post } = await fetchPost(postId)

if (!post.value) throw createError({
    message: "Post not found",
    fatal: true,
    statusCode: 404
})

const { fetchBlocks, usePostBlocksData } = usePostBlocks()

await useAsyncData('blocks', () => fetchBlocks(postId))

const blocks = usePostBlocksData(postId);

const { loadMoreTrigger } = useScrollLoader(() => fetchBlocks(postId), () => blocks.hasMore)


const { fetchComments, getRootComments, useSortedComments } = useComments()

await fetchComments(postId)

const comments = computed(() => getRootComments(postId))

const sortedComments = useSortedComments(comments)


defineOgImageComponent('Image', {
    title: post.value.title,
    description: post.value.description,
    headline: post.value.tags[0]?.name ?? "nei's blog"
})

useSeoMeta({
    title: post.value.title,
    description: post.value.description,
    ogTitle: post.value.title,
    ogDescription: post.value.description,

    twitterCard: 'summary_large_image'
})

useSchemaOrg([
    defineArticle({
        headline: post.value.title,
        description: post.value.description,
        image: post.value.image,
        datePublished: post.value.createdAt,
    })
])
</script>

<template>

    <div class="mx-auto w-full max-w-4xl px-4" v-if="post">

        <div class="mt-12 lg:py-12 ">
            <h1 class="text-4xl font-bold">{{ post.title }}</h1>
            <p class="text-muted-foreground mt-4">{{ useFormattedDate(post.createdAt) }}</p>
        </div>

        <article class="mb-24 text-justify sm:text-start">
            <NotionRenderer :blocks="blocks.blocks"></NotionRenderer>

            <ClientOnly>
                <div class="mt-10" ref="loadMoreTrigger" v-if="blocks.hasMore">
                    Loading...
                </div>
            </ClientOnly>
        </article>



        <div class="my-10">

            <CommentForm />

            <CommentHeader></CommentHeader>

            <CommentList :comments="sortedComments"></CommentList>
        </div>
    </div>
</template>