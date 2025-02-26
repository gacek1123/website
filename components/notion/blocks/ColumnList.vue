<script setup lang="ts">
import type { ColumnListBlockObjectResponse, ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints';
import { isFullBlock } from '@notionhq/client';
import { isType } from '~/shared/notion/utils';
import Column from './Column.vue';

const props = defineProps<{
    block: ColumnListBlockObjectResponse
}>()


const { data } = useLazyFetch('/api/notion/blocks/' + props.block.id, {
    transform(input: ListBlockChildrenResponse) {
        return input.results.filter(isFullBlock).filter((res) => isType(res, 'column'))
    }
})
</script>

<template>
    <div v-if="data" class="flex items-center space-x-4 justify-evenly">
        <div v-for="column in data" class="w-full">
            <Column :block="column"></Column>
        </div>
    </div>
</template>