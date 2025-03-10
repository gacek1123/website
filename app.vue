<script setup lang="ts">
import CommandMenu from './components/CommandMenu.vue';
import Toaster from '@/components/ui/toast/Toaster.vue'
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <CommandMenu />
    <LayoutNavbar />
    <NuxtPage />

    <ClientOnly>
      <Toaster class="pointer-events-auto" />
    </ClientOnly>
  </div>
</template>
