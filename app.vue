<script setup lang="ts">
import CommandMenu from './components/CommandMenu.vue';
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <CommandMenu />
    <LayoutNavbar />
    <NuxtPage />

  </div>
</template>
