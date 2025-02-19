<script lang="ts">
export const pages = [
    {
        name: "Home",
        link: "/",
        icon: "material-symbols:home"
    },
    {
        name: "Blog",
        link: "/blog",
        icon: "material-symbols:book-2-rounded"
    }
]
</script>

<script setup lang="ts">
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

import { Icon } from '@iconify/vue'


const open = useState<boolean>("CommandMenu")
</script>

<template>
    <header className="w-full max-w-4xl mx-auto flex justify-between items-center p-2">
        <NavigationMenu class="block">
            <NavigationMenuList>
                <NavigationMenuItem v-for="item in pages">
                    <NuxtLink :to="item.link" :aria-label="item.name" :class="navigationMenuTriggerStyle()">
                        {{ item.name }}
                    </NuxtLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
        <div class="items-center gap-4 flex">
            <Button variant="outline" aria-label="Open command menu" class="px-2" @click="open = !open">
                <Icon icon="material-symbols:keyboard-command-key" class="h-5 w-5" />
            </Button>
            <LayoutThemeSwitch></LayoutThemeSwitch>
        </div>
    </header>

</template>