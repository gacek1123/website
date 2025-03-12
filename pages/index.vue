<script setup lang="ts">

import Footer from '~/components/layout/Footer.vue';

import {
    PATTERN_BACKGROUND_DIRECTION,
    PATTERN_BACKGROUND_SPEED,
    PATTERN_BACKGROUND_VARIANT,
} from "../components/PatternBackground.vue"

import ArticleCards from '~/components/ArticleCards.vue';


const links = [
    {
        icon: "simple-icons:github",
        link: "https://github.com/nei7",
        name: "Github"
    },
    {
        icon: "simple-icons:discord",
        link: "https://discord.com/users/624981292865552435",
        name: "Discord"
    },
    {
        icon: "simple-icons:steam",
        link: "https://steamcommunity.com/profiles/76561199121681262",
        name: "Steam"
    },
    {
        icon: "simple-icons:x",
        link: "https://x.com/nei13371",
        name: "x.com"
    },
    {
        icon: "simple-icons:youtube",
        link: "https://www.youtube.com/@nei3765",
        name: "Youtube"
    }
]


const posts = await fetchPosts()

const latestPosts = computed(() => posts.value?.slice(0, 2))

const config = useSiteConfig()


const route = useRoute()

defineOgImageComponent('Image', {
    title: config.name,
    description: config.description,
    headline: route.path
})

</script>

<template>
    <div>
        <section class="relative w-full max-w-4xl mx-auto">

            <PatternBackground :animate="true" :direction="PATTERN_BACKGROUND_DIRECTION.TopRight"
                :variant="PATTERN_BACKGROUND_VARIANT.Dot"
                class="absolute -mt-20 -z-10 h-[35rem] flex w-full items-center justify-center"
                :speed="PATTERN_BACKGROUND_SPEED.Slow" />

            <div class="mt-12 flex flex-col justify-center gap-4 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

                <div class="text-center space-y-8">


                    <div class="mx-auto text-5xl font-bold ">
                        <h1 class="">Hey, I'm
                            nei
                        </h1>
                    </div>
                    <p class="max-w-screen-sm mx-auto sm:text-lg text-muted-foreground">I am a high school student
                        from
                        Poland, passionate about gaining knowledge and solving new problems while working on
                        projects.
                    </p>



                    <div class="flex items-center max-w-max mx-auto rounded-full border border-input bg-background px-5 py-2 backdrop-blur-3xl mt-2"
                        style="--stagger:2;" data-animate="">
                        <span class="ml-2 relative flex size-3">
                            <span
                                class="bg-gradient-to-t from-green-600 to-green-600 absolute inline-flex size-full animate-ping rounded-full opacity-75">
                            </span>
                            <span
                                class="bg-gradient-to-t from-green-500 to-green-500 relative inline-flex size-3 scale-90 rounded-full"></span>
                        </span>
                        <span
                            class="bg-gradient-to-t from-green-500 to-green-500 text-transparent bg-clip-text  ml-2 text-sm font-medium">
                            Available for new opportunities</span>

                    </div>
                    <div class="py-12 mx-auto max-w-max">
                        <ul class="flex items-center justify-center text-sm flex-wrap gap-5 text-muted-foreground">
                            <li v-for="link in links">
                                <ExternalLink :icon="link.icon" :link="link.link" :name="link.name"></ExternalLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>


            <div>
                <div class="text-center mx-auto text-3xl font-semibold my-12">
                    <h2>
                        Latest Articles
                    </h2>
                </div>

                <ArticleCards :posts="latestPosts"></ArticleCards>

                <div class="flex items-center justify-center my-14">

                    <Button variant="outline" as-child>
                        <NuxtLink to="/blog">
                            See all posts
                        </NuxtLink>
                    </Button>
                </div>
            </div>

            <Footer />
        </section>

    </div>
</template>
