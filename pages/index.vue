<script setup lang="ts">
import { Icon } from '@iconify/vue';
import Footer from '~/components/home/Footer.vue';

const links = [
    {
        icon: "simple-icons:github",
        link: "",
        name: "Github"
    },
    {
        icon: "simple-icons:discord",
        link: "",
        name: "Discord"
    },
    {
        icon: "simple-icons:steam",
        link: "",
        name: "Steam"
    },
    {
        icon: "simple-icons:x",
        link: "",
        name: "x.com"
    },
    {
        icon: "simple-icons:youtube",
        link: "",
        name: "Youtube"
    }
]

const { fetchPosts } = usePosts()

const { error, status, posts } = await fetchPosts()

import {
    PATTERN_BACKGROUND_DIRECTION,
    PATTERN_BACKGROUND_SPEED,
    PATTERN_BACKGROUND_VARIANT,
} from "../components/PatternBackground.vue"
</script>

<template>
    <div>
        <section class="relative w-full max-w-4xl mx-auto">
            <div class="mt-12 flex flex-col justify-center gap-4 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
                <PatternBackground :animate="true" :direction="PATTERN_BACKGROUND_DIRECTION.TopRight"
                    :variant="PATTERN_BACKGROUND_VARIANT.Dot" class="flex w-full items-center justify-center"
                    :speed="PATTERN_BACKGROUND_SPEED.Slow">
                    <div class="text-center space-y-8 relative">


                        <div class="mx-auto text-5xl font-bold">
                            <h1 class="text-slate-800">Hey, I'm
                                nei
                            </h1>
                        </div>
                        <p class="max-w-screen-sm mx-auto text-lg text-muted-foreground">I am a high school student
                            from
                            Poland, passionate about gaining knowledge and solving new problems while working on
                            projects.
                        </p>



                        <div class="flex items-center max-w-max mx-auto rounded-full border border-input bg-background px-5 py-2 backdrop-blur-3xl mt-2"
                            style="--stagger:2;" data-animate="">
                            <span class="ml-2 relative flex size-3">
                                <span
                                    class="bg-green-600/80 absolute inline-flex size-full animate-ping rounded-full opacity-75">
                                </span>
                                <span class="bg-green-500/80 relative inline-flex size-3 scale-90 rounded-full"></span>
                            </span>
                            <span class="text-green-500/80 ml-2 text-sm font-medium">Currently being online</span>

                        </div>
                        <div class="py-12 mx-auto max-w-max">
                            <ul class="flex items-center justify-center text-sm flex-wrap gap-5 text-muted-foreground">
                                <li v-for="link in links" class="border-b hover:text-foreground transition-colors">
                                    <a class="flex items-center" :href="link.link">
                                        <Icon :icon="link.icon" class="w-[1rem] h-[1rem]" />&nbsp;
                                        {{ link.name }}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </PatternBackground>
            </div>



            <div>
                <div class="text-center mx-auto text-3xl font-semibold my-12">
                    <h2 class="bg-gradient-to-t from-slate-400 to-slate-800 bg-clip-text text-transparent">Latest
                        Articles</h2>
                </div>

                <ArticleCards :error="error" :status="status" :posts="posts"></ArticleCards>

                <div class="flex items-center justify-center my-14">

                    <Button variant="outline" as-child>
                        <NuxtLink to="/blog">
                            See more
                        </NuxtLink>
                    </Button>
                </div>
            </div>

            <Footer />
        </section>

    </div>
</template>
