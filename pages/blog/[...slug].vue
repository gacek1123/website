<script setup lang="ts">
import type { ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints';


const route = useRoute();

const { fetchPosts } = usePosts()

const { data } = useAsyncData<ListBlockChildrenResponse & { post: Post }>(async () => {
    const { error, posts } = await fetchPosts()


    if (!posts?.value || error?.value) throw createError({
        ...error?.value,
    })



    const post = posts.value?.find(({ url }) => url === route.params.slug[0]);


    if (!post) throw createError({
        statusCode: 404,
        message: 'Not found',
        fatal: true
    })


    const list = await $fetch<ListBlockChildrenResponse>("/api/notion/blocks/" + post.id)

    return {
        ...list,
        post: post
    }
})


</script>


<template>

    <div class="mx-auto w-full max-w-4xl" v-if="data">

        <div class="mt-12 lg:py-12">
            <h1 class="text-4xl font-bold">{{ data.post.title }}</h1>
            <p class="text-muted-foreground mt-4">{{ useFormattedDate(data.post.createdAt) }}</p>
        </div>

        <article class="">
            <NotionRenderer :blocks="data.results"></NotionRenderer>
        </article>

    </div>
</template>