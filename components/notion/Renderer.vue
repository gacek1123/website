<script setup lang="ts">
import type { BlockObjectResponse, PartialBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import Block from "./blocks/Block.vue";


defineProps<{
    blocks: (PartialBlockObjectResponse | BlockObjectResponse)[];
}>();
</script>

<template>
    <div>

        <TransitionGroup enter-active-class="duration-500 ease-out" enter-from-class="transform blur-sm"
            enter-to-class="blur-none" leave-active-class="duration-200 ease-in" leave-from-class="blur-none"
            leave-to-class="blur-sm">
            <Block v-for="block in blocks" :key="block.id" :block="block"></Block>
        </TransitionGroup>

    </div>
</template>