<script setup lang="ts">
import type { ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints';

const route = useRoute()

const { data } = await useFetch<ListBlockChildrenResponse>('/api/notion/blocks/' + route.params.page)

</script>

<template>
    <section class="relative max-w-4xl mx-auto w-full mb-20">
        <div v-if="data">
            <NotionRenderer :blocks="data.results"></NotionRenderer>
        </div>
    </section>
</template>