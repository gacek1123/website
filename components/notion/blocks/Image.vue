<script setup lang="ts">
import { type ImageBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

defineProps<{ image: ImageBlockObjectResponse }>();
</script>

<template>
    <div>
        <NuxtImg v-if="image.image.type === 'external'" :src="image.image.external.url"></NuxtImg>
        <NuxtImg v-if="image.image.type === 'file'" :src="image.image.file.url"></NuxtImg>
    </div>

</template>