<script setup lang="ts">
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '@/components/ui/command'
import { VisuallyHidden } from 'reka-ui'
import { Icon } from '@iconify/vue'

import { useMagicKeys } from '@vueuse/core'
import { watch, } from 'vue'
import { pages } from './layout/Navbar.vue'

const posts = await usePosts()

const latestPosts = computed(() => posts.value?.slice(0, 2))

const open = useState("CommandMenu", () => false)

const { Meta } = useMagicKeys({
    passive: false,
    onEventFired(e) {
        if (e.key === 'j' && (e.metaKey || e.ctrlKey))
            e.preventDefault()
    },
})

watch([Meta], (v) => {
    if (v[0])
        handleOpenChange()
})

function handleOpenChange() {
    open.value = !open.value
}


const route = useRoute()

watch(route, () => {
    open.value = false
})
</script>

<template>
    <CommandDialog v-model:open="open" class="rounded-lg">
        <VisuallyHidden>
            <DialogTitle>Menu</DialogTitle>
            <DialogDescription>menu</DialogDescription>
        </VisuallyHidden>



        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Pages">
                <NuxtLink v-for="page in pages" :to="page.link">
                    <CommandItem :value="page.name" class="cursor-pointer">
                        <Icon :icon="page.icon" class="mr-2 w-4 h-4 text-muted-foreground"></Icon>

                        {{ page.name }}
                    </CommandItem>
                </NuxtLink>

            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Latest posts">
                <NuxtLink v-for="post in latestPosts" :to="`/blog/${post.id}/${post.url}`">
                    <CommandItem :value="post.title" class="cursor-pointer">
                        {{ post.title }}
                    </CommandItem>
                </NuxtLink>
            </CommandGroup>
        </CommandList>
    </CommandDialog>

</template>