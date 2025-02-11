<script setup lang="ts">
import { useFormattedDate } from '~/composables/date';
import { Badge } from './ui/badge';

const tagColors = {
    blue: "rgba(93, 165, 206, 1)",
    green: "rgba(123, 183, 129, 1)",
    gray: "rgba(84, 72, 49, 1)",
}

const props = defineProps<{
    title: string,
    date: string,
    image: string,
    path: string,
    tags: { name: string, color: string }[]
}>()

const date = useFormattedDate(props.date)
</script>

<template>
    <NuxtLink :to="path" :aria-label="title" class="flex cursor-pointer flex-col gap-2 group">
        <div class="relative rounded-md overflow-hidden">
            <div class="absolute z-10 top-2 left-2">
                <Badge v-for="tag in tags" class="mr-2"
                    :style="{ backgroundColor: tag.color in tagColors ? tagColors[tag.color as keyof typeof tagColors] : tagColors['gray'] }">
                    {{
                        tag.name
                    }}</Badge>
            </div>
            <div class="transition-colors duration-200">
                <NuxtImg width="1536" :alt="`${title} article image`"
                    class="h-64 w-full object-cover transition-transform duration-200 group-hover:scale-105"
                    :src="image" :aria-label="`${title} article image`" />
            </div>
        </div>
        <div class="flex flex-col transition-transform ease-out group-hover:scale-105 group-hover:translate-x-3">
            <h3 class="text-xl font-semibold">
                <span class="bg-gradient-to-r from-green-200 to-green-100 bg-[length:0px_10px] bg-left-bottom
                    bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px]
                    group-hover:bg-[length:100%_10px]">

                    {{ title }}
                </span>
            </h3>
            <span class="text-xs text-muted-foreground">{{ date }}</span>
        </div>

    </NuxtLink>
</template>