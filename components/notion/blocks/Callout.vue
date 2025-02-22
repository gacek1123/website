<script setup lang="ts">
import type { CalloutBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import TextRenderer from './TextRenderer.vue';
import { notionColorToCss } from '~/lib/notion';


const props = defineProps<{
    callout: CalloutBlockObjectResponse
}>()

const color = notionColorToCss(props.callout.callout.color)
</script>

<template>
    <div :style="color" class="p-3 text-muted-foreground rounded-md" :class="{
        'border': !color
    }">

        <TextRenderer :text="callout.callout.rich_text"></TextRenderer>

    </div>
</template>