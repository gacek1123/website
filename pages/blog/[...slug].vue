<script setup lang="ts">
import type { ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints';

const route = useRoute();

const { fetchPosts, fetchBlocks } = usePosts()

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
const hasMore = ref(data.value?.has_more)
const nextCursor = ref(data.value?.next_cursor)

onMounted(() => {
    if (loadMoreTrigger.value) {
        const observer = new IntersectionObserver(async (entries) => {
            if (entries[0].isIntersecting && hasMore.value && data.value) {

                const list = await fetchBlocks(data.value?.post.id, nextCursor.value ? nextCursor.value : undefined)
                if (!list) {
                    hasMore.value = false
                    return
                }

                data.value.results.push(...list.results)

                hasMore.value = list.has_more
                nextCursor.value = list.next_cursor || null
            }
        }, {
            rootMargin: "200px",
            threshold: 0.1,

        });

        observer.observe(loadMoreTrigger.value);
    }
})
import { Skeleton } from '@/components/ui/skeleton'

</script>


<template>

    <div class="mx-auto w-full max-w-4xl" v-if="data">

        <div class="mt-12 lg:py-12">
            <h1 class="text-4xl font-bold">{{ data.post.title }}</h1>
            <p class="text-muted-foreground mt-4">{{ useFormattedDate(data.post.createdAt) }}</p>
        </div>

        <article class="">
            <NotionRenderer :blocks="data.results"></NotionRenderer>


            <div class="flex flex-col space-y-3 mt-10" ref="loadMoreTrigger" v-if="hasMore">

                <div class="space-y-2">
                    <Skeleton class="h-5 w-full" />
                    <Skeleton class="h-5 w-[75%]" />
                    <Skeleton class="h-5 w-[25%]" />
                    <Skeleton class="h-5 w-[85%]" />
                    <Skeleton class="h-5 w-full" />
                    <Skeleton class="h-5 w-[95%]" />
                    <Skeleton class="h-5 w-[35%]" />
                    <Skeleton class="h-5 w-[45%]" />
                </div>
            </div>


        </article>



    </div>
</template>