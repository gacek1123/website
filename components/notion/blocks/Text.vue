<script setup lang="ts">
import type { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints';

const props = defineProps<{
    text: RichTextItemResponse
}>()


</script>

<template>
    <ExternalLink v-if="text.href" :link="text.href" :name="text.plain_text" style="display: inline-block;" />

    <span v-else :class="{
        'font-bold': text.annotations.bold,
        'italic': text.annotations.italic,
        'line-through': text.annotations.strikethrough,
        'underline': text.annotations.underline,
        'text-blue-600': text.annotations.color === 'blue',
        'text-red-600': text.annotations.color === 'red',
        // 'text-muted-foreground': text.annotations.color === 'default',
        'p-1 px-2 text-sm font-mono bg-accent rounded': text.annotations.code,
    }">
        {{ text.plain_text }}
    </span>

</template>