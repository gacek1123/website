<script setup lang="ts">
import type { CalloutBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import TextRenderer from './TextRenderer.vue';
import { notionColorToCss } from '~/lib/notion';


defineProps<{
    callout: CalloutBlockObjectResponse
}>()
</script>

<template>
    <Card :style="notionColorToCss(callout.callout.color)">
        <CardContent>
            <TextRenderer :text="callout.callout.rich_text"></TextRenderer>
        </CardContent>
    </Card>
</template>