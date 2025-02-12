<script setup lang="ts">
import type { BlockObjectResponse, PartialBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import Block from "./blocks/Block.vue";
import { isFullBlock } from "@notionhq/client";

defineProps<{
    blocks: (PartialBlockObjectResponse | BlockObjectResponse)[];
}>();
</script>

<template>
    <div>
        <template v-for="block in blocks" :key="block.id">
            <Block v-if="isFullBlock(block)" :block="block"></Block>
        </template>
    </div>
</template>