<script setup lang="ts">
import type { ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints';

const route = useRoute();

const { fetchPosts, fetchBlocks } = usePosts()

const { data, status } = await useAsyncData<ListBlockChildrenResponse & { post: Post }>(async () => {
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


    const list = await fetchBlocks(post.id)

    if (!list) throw createError({
        statusCode: 500,
    })

    return {
        ...list,
        post: post
    }
})

const loadMoreTrigger = ref<HTMLDivElement>()

onMounted(() => {


    if ("history" in window) {
        window.history.scrollRestoration = 'auto';
    }

    watch(loadMoreTrigger, () => setupObserver(), { once: true })
})

const setupObserver = () => {
    if (!loadMoreTrigger.value || status.value !== 'success') return

    const observer = new IntersectionObserver(async (entries) => {
        if (entries[0].isIntersecting && data.value && data.value.next_cursor) {

            const list = await fetchBlocks(data.value?.post.id, data.value.next_cursor ? data.value.next_cursor : undefined)
            if (!list) {
                data.value.has_more = false
                return
            }

            data.value.results.push(...list.results)

            data.value.has_more = list.has_more
            data.value.next_cursor = list.next_cursor
        }
    }, {
        rootMargin: "200px",
        threshold: 0.1,

    });

    observer.observe(loadMoreTrigger.value);
}
</script>


<template>

    <div class="mx-auto w-full max-w-4xl" v-if="data">

        <div class="mt-12 lg:py-12 px-4  ">
            <h1 class="text-4xl font-bold">{{ data.post.title }}</h1>
            <p class="text-muted-foreground mt-4">{{ useFormattedDate(data.post.createdAt) }}</p>
        </div>

        <article class="mb-24 px-4 text-justify sm:text-start">
            <NotionRenderer :blocks="data.results"></NotionRenderer>

            <ClientOnly>
                <div class="mt-10" ref="loadMoreTrigger" v-if="data.has_more">
                    Loading...
                </div>
            </ClientOnly>
        </article>
    </div>
</template>