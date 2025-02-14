<script setup lang="ts">

const { fetchPosts } = usePosts()
const { fetchBlocks, getBlockById } = usePostBlocks()

const { posts } = await fetchPosts()

if (!posts || !posts.value) throw createError({
    message: "Failed to fetch posts",
    status: 500,
})

const route = useRoute();

const post = posts.value.find(({ url }) => url === route.params.slug[0])
if (!post) throw createError({
    message: "Post not found",
    fatal: true,
    statusCode: 404
})

await useAsyncData(() => fetchBlocks(post.id))

const block = getBlockById(post.id)

const loadMoreTrigger = ref<HTMLDivElement>()

onMounted(() => {
    if ("history" in window) {
        window.history.scrollRestoration = 'auto';
    }

    watch(loadMoreTrigger, () => setupObserver(), { once: true })
})

const setupObserver = () => {
    if (!loadMoreTrigger.value || !block.has_more) return

    const observer = new IntersectionObserver(async (entries) => {
        if (entries[0].isIntersecting && block.has_more) {
            await fetchBlocks(post.id)
        }
    }, {
        rootMargin: "200px",
        threshold: 0.1,

    });


    observer.observe(loadMoreTrigger.value);
}

defineOgImageComponent('Blog', {
    title: post.title,
    description: post.description,
    date: useFormattedDate(post.createdAt),
    tags: post.tags.map(tag => tag.name)
})

useSeoMeta({
    title: post.title,
    description: post.description,
    ogTitle: post.title,
    ogDescription: post.description,

    twitterCard: 'summary_large_image'
})

useSchemaOrg([
    defineArticle({
        headline: post.title,
        description: post.description,
        image: post.image,
        datePublished: post.createdAt,
    })
])



</script>

<template>

    <div class="mx-auto w-full max-w-4xl" v-if="post">

        <div class="mt-12 lg:py-12 px-4  ">
            <h1 class="text-4xl font-bold">{{ post.title }}</h1>
            <p class="text-muted-foreground mt-4">{{ useFormattedDate(post.createdAt) }}</p>
        </div>

        <article class="mb-24 px-4 text-justify sm:text-start">
            <NotionRenderer :blocks="block.results"></NotionRenderer>

            <ClientOnly>
                <div class="mt-10" ref="loadMoreTrigger" v-if="block.has_more">
                    Loading...
                </div>
            </ClientOnly>
        </article>
    </div>
</template>