<script setup lang="ts">
import {
    type BulletedListItemBlockObjectResponse,
    type NumberedListItemBlockObjectResponse
} from "@notionhq/client/build/src/api-endpoints";
import TextRenderer from "./TextRenderer.vue";

defineProps<{
    list_item: BulletedListItemBlockObjectResponse | NumberedListItemBlockObjectResponse;
}>();
</script>

<template>
    <div class="mt-3 text-sm">
        <div v-if="list_item.type === 'bulleted_list_item'" class="flex items-center">
            <div class="bg-foreground rounded-full w-1.5 h-1.5 mr-2 "></div>
            <TextRenderer :text="list_item.bulleted_list_item.rich_text"></TextRenderer>
        </div>
        <div v-else>
            <TextRenderer :text="list_item.numbered_list_item.rich_text"></TextRenderer>
        </div>
    </div>
</template>