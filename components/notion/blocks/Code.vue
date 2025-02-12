<script setup lang="ts">
import type { CodeBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { type BundledLanguage } from 'shiki';

const { code } = defineProps<{ code: CodeBlockObjectResponse }>();

const text = code.code.rich_text.reduce((acc, curr) => acc + curr.plain_text, "");

const isAllowedLanguage = (language: string): language is BundledLanguage => ["arduino", "agda"].includes(language)

const language: BundledLanguage | undefined = isAllowedLanguage(code.code.language) ? code.code.language : undefined

</script>

<template>
    <Shiki :lang="language" :code="text" as="div" :highlight-options="{ theme: 'material-theme-lighter' }" />
</template>

<style>
.shiki {
    padding: 1rem;
}
</style>