<script setup lang="ts">
import PatternBackground from '../PatternBackground.vue'

const props = defineProps({
    path: String,
    title: String,
    description: String,
    colorMode: String,
    date: String,
    tags: Array
})

const colorMode = computed(() => {
    return props.colorMode || 'light'
})



const siteConfig = useSiteConfig()
const siteName = computed(() => {
    return siteConfig.name
})

const theme = '#166534'
</script>


<template>
    <div class="w-full h-screen bg-white relative">
        <div class="h-[700px] w-full absolute"
            style="background-image: url('https://imagedelivery.net/gC77PfJa-d3eBOxGPxtDxw/b5869182-255e-4ee1-7960-5c3bead9f200/public'); mask-image: radial-gradient(ellipse at center, black, transparent 85%)">

        </div>

        <div class="w-full flex justify-between relative pb-[12rem]">
            <div class="h-full w-full relative">
                <div class="text-center mx-auto mt-10">
                    <p v-if="siteName" style="font-size: 20px;"
                        class="font-bold underline  decoration-dashed decoration-green-500">
                        {{ date }}
                    </p>
                </div>
                <div class="h-full flex flex-row justify-between ">
                    <div class="flex flex-col w-full items-center justify-center">
                        <h1 class="m-0 font-bold mb-[10px] text-[65px] text-center max-w-5xl ">
                            {{ title }}
                        </h1>
                        <p v-if="description" class="text-[25px] text-neutral-500">
                            {{ description }}
                        </p>
                    </div>

                </div>
                <div class="flex flex-row justify-center items-center text-left w-full gap-x-3">
                    <div class="px-2.5 py-1 bg-neutral-600 rounded-full text-white  font-medium" v-for="tag in tags">{{
                        tag }}</div>

                </div>
            </div>

        </div>



    </div>
</template>