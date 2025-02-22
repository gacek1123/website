<script setup lang="ts">
import { type ImageBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

defineProps<{ image: ImageBlockObjectResponse }>();
</script>

<template>

    <NuxtImg class="max-w-full h-auto" v-if="image.image.type === 'external'" :src="image.image.external.url">
    </NuxtImg>
    <NuxtImg class="max-w-full h-auto" v-if="image.image.type === 'file'" :src="image.image.file.url"></NuxtImg>


</template>