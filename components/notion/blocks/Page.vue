<script setup lang="ts">
import { type ChildPageBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

defineProps<{ block: ChildPageBlockObjectResponse }>();
</script>

<template>
    <NuxtLink class="border-b hover:text-foreground transition-colors text-green-600 font-medium"
        :to="`/page/${block.id}/${block.child_page.title}`">
        {{ block.child_page.title }}
    </NuxtLink>
</template>