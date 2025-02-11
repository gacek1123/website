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

const pages = [
    {
        name: "Home",
        link: "/"
    },
    {
        name: "Blog",
        link: "/blog"
    },
    {
        name: "Dashboard"
    }
]
</script>

<template>
    <header className="w-full max-w-4xl mx-auto flex justify-between items-center p-2">
        <NavigationMenu class="block">
            <NavigationMenuList>
                <NavigationMenuItem v-for="item in pages">
                    <NuxtLink :to="item.link" :class="navigationMenuTriggerStyle()">
                        {{ item.name }}
                    </NuxtLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
        <div class="hidden items-center gap-4 lg:flex">
            <Button variant="outline" class="px-2">
                <Icon icon="material-symbols:keyboard-command-key" class="h-5 w-5" />
            </Button>
            <LayoutThemeSwitch></LayoutThemeSwitch>
        </div>
    </header>

</template>