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

</script>

<template>
    <header className="w-full max-w-4xl mx-auto flex justify-between items-center p-2">

        <NavigationMenu class="block">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuLink href="/" :class="navigationMenuTriggerStyle()">Home
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink href="/posts" :class="navigationMenuTriggerStyle()">Blog
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink href="/work" :class="navigationMenuTriggerStyle()">
                        Work
                    </NavigationMenuLink>
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