<script setup lang="ts">
import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import Header from './Header.vue';
import List from './List.vue';
import Paragraph from './Paragraph.vue';
import Image from './Image.vue';
import Code from './Code.vue';

defineProps<{
    block: BlockObjectResponse
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
    <Header v-if="isType(block, 'heading_1', 'heading_2', 'heading_3')" :block="block"></Header>
    <List v-if="isType(block, 'bulleted_list_item', 'numbered_list_item')" :list_item="block"></List>
    <Paragraph v-if="isType(block, 'paragraph')" :paragraph="block"></Paragraph>
    <Image v-if="isType(block, 'image')" :image="block"></Image>
    <Code v-if="isType(block, 'code')" :code="block"></Code>
</template>