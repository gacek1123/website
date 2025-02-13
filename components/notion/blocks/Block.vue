<script setup lang="ts">
import type { BlockObjectResponse, PartialBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import Header from './Header.vue';
import List from './List.vue';
import Paragraph from './Paragraph.vue';
import Image from './Image.vue';
import Code from './Code.vue';

import { isFullBlock } from "@notionhq/client";

defineProps<{
    block: BlockObjectResponse | PartialBlockObjectResponse
}>()

function isType<T extends BlockObjectResponse, U extends T["type"]>(
    block: T,
    ...types: U[]
): block is T & { type: U } {
    for (let t of types) if (t === block.type) return true

    return false
}

</script>

<template>
    <div v-if="!isFullBlock(block)"></div>
    <Header v-else-if="isType(block, 'heading_1', 'heading_2', 'heading_3')" :block="block"></Header>
    <List v-else-if="isType(block, 'bulleted_list_item', 'numbered_list_item')" :list_item="block"></List>
    <Paragraph v-else-if="isType(block, 'paragraph')" :paragraph="block"></Paragraph>
    <Image v-else-if="isType(block, 'image')" :image="block"></Image>
    <Code v-else-if="isType(block, 'code')" :code="block"></Code>

</template>