<script setup lang="ts">
const { fetchBlocks } = usePostBlocks()
const { fetchPost, posts } = usePosts();
const route = useRoute();
const loadMoreTrigger = ref<HTMLDivElement>()

const { data: post } = await useAsyncData("post", async () => {
    return posts.value?.find(({ id }) => id === route.params.post) ?? await fetchPost(route.params.post as string);
});

if (!post.value) throw createError({
    message: "Post not found",
    fatal: true,
    statusCode: 404
})

const { data: blocks } = await useAsyncData("blocks", async () =>
    await fetchBlocks(post.value!.id)
)

onMounted(() => {
    if ("history" in window) {
        window.history.scrollRestoration = 'auto';
    }

    watch(loadMoreTrigger, (el) => {
        if (el) setupObserver(el);
    }, { once: true });
})

const setupObserver = (target: HTMLDivElement) => {
    if (!blocks.value?.has_more || !post.value) return;

    const observer = new IntersectionObserver(async (entries, obs) => {
        if (entries[0].isIntersecting) {
            await fetchBlocks(post.value!.id, blocks);
        }


        if (!blocks.value?.has_more) {
            obs.disconnect();
        }
    }, {
        rootMargin: "200px",
        threshold: 0.1,
    });


    observer.observe(target);
}

defineOgImageComponent('Image', {
    title: post.value.title,
    description: post.value.description,
    headline: post.value.tags[0].name
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

        <div class="mt-12 lg:py-12 px-4  ">
            <h1 class="text-4xl font-bold">{{ post.title }}</h1>
            <p class="text-muted-foreground mt-4">{{ useFormattedDate(post.createdAt) }}</p>
        </div>

        <article class="mb-24 px-4 text-justify sm:text-start" v-if="blocks">
            <NotionRenderer :blocks="blocks.results"></NotionRenderer>

            <ClientOnly>
                <div class="mt-10" ref="loadMoreTrigger" v-if="blocks.has_more">
                    Loading...
                </div>
            </ClientOnly>
        </article>
    </div>
</template>