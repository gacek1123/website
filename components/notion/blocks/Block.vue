<script setup lang="ts">
import type { BlockObjectResponse, PartialBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import Header from './Header.vue';
import List from './List.vue';
import Paragraph from './Paragraph.vue';
import Image from './Image.vue';
import Code from './Code.vue';
import Callout from './Callout.vue';
import Table from './Table.vue';
import Separator from '~/components/ui/separator/Separator.vue';
import ColumnList from './ColumnList.vue';
import { isFullBlock } from "@notionhq/client";

import { isType } from '~/lib/notion';


defineProps<{
    block: BlockObjectResponse | PartialBlockObjectResponse
}>()



</script>

<template>
    <div v-if="!isFullBlock(block)"></div>
    <Header v-else-if="isType(block, 'heading_1', 'heading_2', 'heading_3')" :block="block"></Header>
    <List v-else-if="isType(block, 'bulleted_list_item', 'numbered_list_item', 'to_do')" :list_item="block"></List>
    <Paragraph v-else-if="isType(block, 'paragraph')" :paragraph="block"></Paragraph>
    <Image v-else-if="isType(block, 'image')" :image="block"></Image>
    <Code v-else-if="isType(block, 'code')" :code="block"></Code>
    <Table v-else-if="isType(block, 'table')" :table="block"></Table>
    <Separator v-else-if="isType(block, 'divider')" orientation="horizontal"></Separator>
    <Callout v-else-if="isType(block, 'callout')" :callout="block"></Callout>
    <ColumnList v-else-if="isType(block, 'column_list')" :block="block"></ColumnList>
    <div v-else>

    </div>
</template>