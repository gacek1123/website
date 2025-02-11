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
        name: ""
    }
]
</script>

<template>
    <header className="w-full max-w-4xl mx-auto flex justify-between items-center p-2">
        <NavigationMenu class="block">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NuxtLink to="/" :class="navigationMenuTriggerStyle()">
                        Home
                    </NuxtLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NuxtLink to="/blog" :class="navigationMenuTriggerStyle()">
                        Blog
                    </NuxtLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NuxtLink to="/work" :class="navigationMenuTriggerStyle()">
                        Work
                    </NuxtLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
        <div class="hidden items-center gap-4 lg:flex">
            <Button variant="outline" class="px-2">
                <Icon icon="material-symbols:keyboard-command-key" class="h-5 w-5" />
            </Button>
            <Button>
                <Icon icon="radix-icons:sun" class="absolute h-[1.2rem] w-[1.2rem] transition-all rotate-0 scale-100" />
            </Button>
        </div>
    </header>

</template>