<script setup lang="ts">
import { Icon } from '@iconify/vue'
import ArticleCards from '~/components/ArticleCards.vue'

import {
    PATTERN_BACKGROUND_DIRECTION,
    PATTERN_BACKGROUND_SPEED,
    PATTERN_BACKGROUND_VARIANT,
} from "../../components/PatternBackground.vue"

const { fetchPosts } = usePosts()

const { error, status, posts } = await fetchPosts()

const searchText = ref("")


const filteredPosts = computed(() => {
    if (posts?.value) return posts.value.filter((post) =>
        post.title.toLowerCase().includes(searchText.value.toLowerCase())
    )
})
const description = `Here I share knowledge, experiences and thoughts on topics that fascinate me.`

const route = useRoute()

defineOgImageComponent('Image', {
    title: 'Blog',
    description,
    headline: route.path
})

useSeoMeta({
    description,
})
</script>

<template>
    <div>
        <section class="relative max-w-4xl mx-auto w-full mb-20">
            <PatternBackground :animate="true" :direction="PATTERN_BACKGROUND_DIRECTION.TopRight"
                :variant="PATTERN_BACKGROUND_VARIANT.Dot"
                class="absolute  -mt-12 -z-10 h-[22rem] flex w-full items-center justify-center"
                :speed="PATTERN_BACKGROUND_SPEED.Slow" />
            <div class="mt-12 flex flex-col justify-center gap-4 px-4 py-8 sm:px-6 lg:px-8 lg:py-12 relative">
                <div class="text-center space-y-8">

                    <div class="mx-auto text-5xl font-bold">
                        <h1>
                            Blog
                        </h1>
                    </div>
                    <h2 class="max-w-screen-sm mx-auto sm:text-lg text-muted-foreground"> {{ description }}</h2>
                </div>
            </div>
            <div class="my-16 px-4">
                <div class="relative w-full items-center">
                    <Input v-model="searchText" id="search" type="text" placeholder="Search..." class="pl-12" />
                    <span class=" absolute start-0 inset-y-0 flex items-center justify-center px-2 pl-4">
                        <Icon icon="material-symbols:search-rounded" class="size-[1.2rem] text-muted-foreground" />
                    </span>
                </div>
            </div>


            <ArticleCards :posts="filteredPosts"></ArticleCards>


        </section>
    </div>
</template>