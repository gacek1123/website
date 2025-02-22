<script setup lang="ts">
import { type ChildPageBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

defineProps<{ block: ChildPageBlockObjectResponse }>();

const route = useRoute()


</script>

<template>
    <NuxtLink :to="`${route.path}/${block.id}`">
        {{ block.child_page.title }}
    </NuxtLink>
</template>