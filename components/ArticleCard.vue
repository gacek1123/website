<script setup lang="ts">
import { useFormattedDate } from '~/composables/useDate';
import { Badge } from './ui/badge';

const props = defineProps<{
    id: string,
    title: string,
    date: string,
    image?: string,
    path?: string,
    tags: { name: string, color: string }[]
}>()

const date = useFormattedDate(props.date)
</script>

<template>
    <NuxtLink :to="`/blog/${id}/${path}`" :aria-label="title" class="flex cursor-pointer flex-col gap-2 group">
        <div class="relative rounded-md overflow-hidden">
            <div class="absolute z-10 top-2 left-2">
                <Badge v-for="tag in tags" class="mr-2 text-white bg-neutral-800">
                    {{ tag.name }}
                </Badge>
            </div>
            <div class="transition-colors duration-200">

                <NuxtImg provider="cloudflare-custom" fit="cover" format="webp" :alt="`${title} article image`"
                    sizes="xs:320px xl:640"
                    class="h-64 w-full object-cover transition-transform duration-200 group-hover:scale-105"
                    :src="image" :aria-label="`${title} article image`" />
            </div>
        </div>
        <div class="flex flex-col transition-transform ease-out group-hover:scale-105 group-hover:translate-x-3">
            <h3 class="text-xl font-semibold">
                <span class="bg-gradient-article dark:from-green-900 dark:to-green-800 bg-[length:0px_10px] bg-left-bottom
                    bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px]
                    group-hover:bg-[length:100%_10px]">
                    {{ title }}
                </span>
            </h3>
            <span class="text-xs text-muted-foreground">{{ date }}</span>
        </div>

    </NuxtLink>
</template>
