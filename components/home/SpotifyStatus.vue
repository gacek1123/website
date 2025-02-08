<script setup lang="ts">
import { Icon } from "@iconify/vue"

const { status, data: song } = useFetch<any>("/api/spotify", { lazy: true })


</script>

<template>
    <div class="cursor-pointer flex items-center gap-3">
        <Icon icon="logos:spotify-icon" class="w-5 h-5" />

        <div class="text-sm opacity-75">
            <p>
                {{ status === "error" ? "Couldn't get the song" : null }}
                {{ status === "pending" ? "Loading..." : null }}
                {{ song.isPlaying ? null : "Not playing" }}
                <NuxtLink v-if="song.isPlaying" :to="song.songUrl">
                    {{ song.name }} - {{ song.artist[0] }}
                </NuxtLink>
            </p>
        </div>

    </div>
</template>