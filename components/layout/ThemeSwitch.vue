<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Icon } from '@iconify/vue'

const colorMode = useColorMode()

</script>

<template>
  <ClientOnly>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button :variant="colorMode.value === 'dark' ? 'outline' : 'default'">
          <Icon icon="radix-icons:moon"
            class="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 absolute" />

          <Icon icon="radix-icons:sun"
            class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />

          <span class="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem class="cursor-pointer" @click="colorMode.preference = 'light'">
          Light
        </DropdownMenuItem>
        <DropdownMenuItem class="cursor-pointer" @click="colorMode.preference = 'dark'">
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem class="cursor-pointer" @click="colorMode.preference = 'system'">
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </ClientOnly>
</template>