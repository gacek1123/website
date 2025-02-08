<script setup lang="ts">
import { Badge } from './ui/badge';

defineProps<{
    title: string,
    date: string,
    image: string,
    path: string,
}>()
</script>

<template>
    <NuxtLink :to="path" :aria-label="title" class="flex cursor-pointer flex-col gap-2 group">
        <div class="relative rounded-md overflow-hidden">
            <div class="absolute z-10 top-2 left-2">
                <Badge>Programming</Badge>
            </div>
            <div class="transition-colors duration-200">
                <NuxtImg width="1536" :alt="`${title} article image`"
                    class="h-64 w-full object-cover transition-transform duration-200 group-hover:scale-105"
                    :src="image" :aria-label="`${title} article image`" />
            </div>
        </div>
        <div class="flex flex-col transition-transform ease-out group-hover:scale-105 group-hover:translate-x-3">
            <h3 class="text-xl font-semibold">
                {{ title }}
            </h3>
            <span class="text-xs text-muted-foreground">{{ date }}</span>
        </div>

    </NuxtLink>
</template>