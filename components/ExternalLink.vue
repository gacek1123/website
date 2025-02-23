<script lang="ts" setup>
import { Icon } from '@iconify/vue';

defineProps<{
    link: string,
    icon?: string,
    name: string,
}>()
</script>

<template>
    <NuxtLink class="flex items-center border-b hover:text-foreground transition-colors" :to="link" external
        target="_blank">
        <Icon v-if="icon" :icon="icon" class="w-[1rem] h-[1rem] mr-1" />
        {{ name }}
    </NuxtLink>
</template>