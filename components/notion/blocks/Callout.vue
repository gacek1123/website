<script setup lang="ts">
import type { CalloutBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import TextRenderer from './TextRenderer.vue';


defineProps<{
    callout: CalloutBlockObjectResponse
}>()
</script>

<template>
    <Card>
        <CardContent></CardContent>
    </Card>
</template>