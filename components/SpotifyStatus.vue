<script setup lang="ts">
import { Icon } from "@iconify/vue"
const { status, data: song } = useFetch<{
    name: string | null
    isPlaying: boolean,
    songUrl: string | null
    artist: string[] | null

}>("/api/spotify", { lazy: true })

const songName = computed(() => (song.value?.name || '').slice(0, 20))
const songArtist = computed(() => (song.value?.artist || []).join(", ").slice(0, 30))
</script>

<template>
    <div class="cursor-pointer flex items-center gap-3">
        <Icon icon="logos:spotify-icon" class="w-5 h-5" />

        <div class="text-xs sm:text-sm opacity-75">
            <p>
                <template v-if="status === 'error'">
                    Couldn't get the song
                </template>
                <template v-else-if="status === 'pending'">
                    Loading...
                </template>

                <template v-else-if="song && song.isPlaying">
                    <NuxtLink :to="song.songUrl || ''">
                        {{ songName }} - {{ songArtist }}
                    </NuxtLink>
                </template>
                <template v-else>Not playing</template>
            </p>
        </div>

    </div>
</template>