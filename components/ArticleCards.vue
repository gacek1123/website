<script setup lang="ts">
import type { AsyncDataRequestStatus } from '#app';
import type { Post } from '~/shared/notion/post';
import ArticleCard from './ArticleCard.vue';

defineProps<{
    status?: AsyncDataRequestStatus,
    error?: Error | null
    posts?: Post[]
}>()
</script>

<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-7 px-4">
        <template v-for="post in posts">
            <ArticleCard v-if="post" :id="post.id" :title="post.title" :image="post.image" :path="post.url"
                :date="post.createdAt" :tags="post.tags" />
        </template>
    </div>

</template>