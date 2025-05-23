<script setup lang="ts">
import CommentForm from '~/components/comments/CommentForm.vue'
import CommentList from '~/components/comments/CommentList.vue'
import CommentHeader from '~/components/comments/CommentHeader.vue';
import { useFormattedDate } from '~/composables/useDate';
import { useInfiniteQuery } from '@tanstack/vue-query';
import { usePost } from '~/composables/post';

definePageMeta({
    alias: [
        '/blog/:post()/:slug(.*)*',
        '/page/:post()/:slug(.*)*'
    ]
})

const postId = usePostId()

const post = await usePost(postId)

if (!post.value) throw createError({
    message: "Post not found",
    fatal: true,
    statusCode: 404
})

const {
    data,
    fetchNextPage,
    hasNextPage,
    suspense
} = useInfiniteQuery({
    queryKey: ['blocks', postId],
    queryFn: ({ pageParam }) => fetchBlocks({ postId, nextCursor: pageParam }),
    getNextPageParam: (lastPage) => lastPage.next_cursor,
    initialPageParam: ''
})

await suspense()


const { useSortedComments, fetchComments } = await useComments()

await fetchComments()

const commments = useSortedComments()

const blocks = computed(() => data.value?.pages.flatMap(chunk => chunk.results))

const { loadMoreTrigger } = useScrollLoader(fetchNextPage, hasNextPage)


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

        <article class="mb-24 text-justify sm:text-start" v-if="blocks">
            <NotionRenderer :blocks="blocks"></NotionRenderer>

            <ClientOnly>
                <div class="mt-10" ref="loadMoreTrigger" v-if="hasNextPage">
                    Loading...
                </div>
            </ClientOnly>
        </article>



        <div class="my-10">
            <CommentForm />

            <CommentHeader></CommentHeader>

            <CommentList :comments="commments"></CommentList>
        </div>
    </div>
</template>