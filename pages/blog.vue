<script setup lang="ts">
import Input from '~/components/ui/input/Input.vue';
import { Search } from 'lucide-vue-next'

const { fetchPosts } = usePosts()

const posts = await fetchPosts()
</script>

<template>
    <section class="max-w-4xl mx-auto w-full">
        <div class="mt-12 flex flex-col justify-center gap-4 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

            <div class="text-center space-y-8">

                <div class="mx-auto text-5xl font-bold">
                    <h1 class="text-slate-800">
                        Blog
                    </h1>
                </div>
                <p class="max-w-screen-sm mx-auto text-xl text-muted-foreground">Here I share knowledge, experiences and
                    thoughts
                    on topics that fascinate me. </p>
            </div>




        </div>
        <div class="my-16">
            <div class="relative w-full items-center">
                <Input id="search" type="text" placeholder="Search..." class="pl-10" />
                <span class=" absolute start-0 inset-y-0 flex items-center justify-center px-2">
                    <Search class="size-5 text-muted-foreground" />
                </span>
            </div>
        </div>

        <div class="grid grid-cols-2 gap-7">
            <ArticleCard title="Artykuł"
                image="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg" path="/"
                date="Aug 22, 2023" />
            <ArticleCard title="Artykuł"
                image="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg" path="/"
                date="Aug 22, 2023" />
        </div>

    </section>

</template>