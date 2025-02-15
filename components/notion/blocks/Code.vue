<script setup lang="ts">
import type { CodeBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';


const props = defineProps<{ code: CodeBlockObjectResponse }>();

const text = props.code.code.rich_text.reduce((acc, curr) => acc + curr.plain_text, "");

const isAllowedLanguage = (language: string) => !["arduino", "agda"].includes(language)

const language: string | undefined = isAllowedLanguage(props.code.code.language) ? props.code.code.language : undefined

const code = ref("")

const colorMode = useColorMode()
const highlighter = await getHighlighter()

onMounted(async () => {
    const { bundledLanguages } = await import('shiki/langs')


    if (language && !highlighter.getLoadedLanguages().includes(language)) {
        const importFn = (bundledLanguages as any)[language]
        if (!importFn) return

        await highlighter.loadLanguage(importFn)
    }

    if (language)
        code.value = await highlighter.codeToHtml(text, {
            lang: language, themes: {
                light: 'vitesse-light',
                dark: 'vitesse-dark'
            },
        })
})



</script>

<template>
    <div v-html="code" class="rounded-md overflow-x-auto"></div>
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