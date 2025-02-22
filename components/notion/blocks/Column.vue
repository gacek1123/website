<script setup lang="ts">
import type { ColumnBlockObjectResponse, ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints';

import NotionRenderer from '../Renderer.vue'

const props = defineProps<{
    block: ColumnBlockObjectResponse
}>()


const { data } = useLazyFetch<ListBlockChildrenResponse>("/api/notion/blocks/" + props.block.id)
</script>


<template>
    <div>
        <NotionRenderer v-if="data" :blocks="data?.results"></NotionRenderer>
    </div>
</template>