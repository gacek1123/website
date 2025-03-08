<script setup lang="ts">
import CommentForm from '~/components/comments/Form.vue'
import { useFormattedDate } from '~/composables/useDate';


const { fetchPost } = usePosts();
const route = useRoute();


definePageMeta({
    alias: [
        '/blog/:post()/:slug(.*)*',
        '/page/:post()/:slug(.*)*'
    ]
})

const postId = route.params.post as string

const { data: post } = await fetchPost(postId)

if (!post.value) throw createError({
    message: "Post not found",
    fatal: true,
    statusCode: 404
})

const { fetchBlocks, usePostBlocksData } = usePostBlocks()

useAsyncData(() => fetchBlocks(postId))

const blocks = usePostBlocksData(postId);

const { loadMoreTrigger } = useScrollLoader(() => fetchBlocks(postId), () => blocks.value.hasMore)


defineOgImageComponent('Image', {
    title: post.value.title,
    description: post.value.description,
    headline: post.value.tags[0]?.name ?? route.path
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

    <div class="mx-auto w-full max-w-4xl" v-if="post">

        <div class="mt-12 lg:py-12 px-4">
            <h1 class="text-4xl font-bold">{{ post.title }}</h1>
            <p class="text-muted-foreground mt-4">{{ useFormattedDate(post.createdAt) }}</p>
        </div>

        <article class="mb-24 px-4 text-justify sm:text-start">
            <NotionRenderer :blocks="blocks.blocks"></NotionRenderer>

            <ClientOnly>
                <div class="mt-10" ref="loadMoreTrigger" v-if="blocks.hasMore">
                    Loading...
                </div>
            </ClientOnly>
        </article>


        <div class="mb-20">


            <CommentForm />
        </div>
    </div>
</template>