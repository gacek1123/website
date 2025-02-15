<script setup lang="ts">
import SpotifyStatus from '~/components/home/SpotifyStatus.vue';
</script>

<template>
    <footer class="mt-32 mb-10 px-4">
        <div class="flex justify-between">
            <SpotifyStatus />

            <div
                class="bg-gradient-to-t from-muted-foreground to-muted-foreground bg-clip-text text-transparent text-xs">
                © 2025 Franciszek Szarek
            </div>
        </div>
    </footer>
</template>