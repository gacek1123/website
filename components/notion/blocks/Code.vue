<script setup lang="ts">
import type { CodeBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { type BundledLanguage } from 'shiki';

const props = defineProps<{ code: CodeBlockObjectResponse }>();

const text = props.code.code.rich_text.reduce((acc, curr) => acc + curr.plain_text, "");

const isAllowedLanguage = (language: string): language is BundledLanguage => !["arduino", "agda"].includes(language)

const language: BundledLanguage | undefined = isAllowedLanguage(props.code.code.language) ? props.code.code.language : undefined

</script>

<template>
    <Shiki :lang="language" :code="text" as="div" :highlight-options="{
        themes: {
            light: 'vitesse-light',
            dark: 'vitesse-dark'
        },
    }" class="rounded-md overflow-x-auto" />
</template>

<style>
.shiki {
    padding: 1rem;
    border-radius: calc(var(--radius) - 2px);
    overflow-x: auto;
}

.shiki,
.shiki span {
    background-color: hsl(0 0% 96.1%) !important;
}

html.dark-mode .shiki,
html.dark-mode .shiki span {
    color: var(--shiki-dark) !important;
    background-color: var(--shiki-dark-bg) !important;
    /* Optional, if you also want font styles */
    font-style: var(--shiki-dark-font-style) !important;
    font-weight: var(--shiki-dark-font-weight) !important;
    text-decoration: var(--shiki-dark-text-decoration) !important;
}
</style>