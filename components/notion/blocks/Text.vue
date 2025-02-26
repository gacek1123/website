<script setup lang="ts">
import type { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints';
import { notionColorToCss } from '~/shared/notion/utils';

const props = defineProps<{
    text: RichTextItemResponse
}>()
</script>

<template>
    <ExternalLink v-if="text.href" :link="text.href" :name="text.plain_text" style="display: inline-block;"
        class="text-green-600 font-medium" />

    <span v-else :class="{
        'font-bold': text.annotations.bold,
        'italic': text.annotations.italic,
        'line-through': text.annotations.strikethrough,
        'underline': text.annotations.underline,
        'p-1 px-2 text-foreground font-mono bg-accent rounded': text.annotations.code,
    }" :style="notionColorToCss(text.annotations.color)">
        {{ text.plain_text }}
    </span>

</template>