<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Icon } from '@iconify/vue';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const props = defineProps<{
    content: string,
    createdAt: Date,
    id: number,
    username: string
    userAvatar: string
    repliedCommentId: number | null
    upvoteCount: number
    downvoteCount: number
    replies: number
}>()

const createdAt = useFormattedDate(props.createdAt)
</script>

<template>
    <div class="flex items-start gap-4">
        <Avatar class="shrink-0 w-7 h-7">
            <AvatarImage :src="userAvatar" alt="user avatar" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>


        <div class="grid gap-3 flex-1">
            <div class="flex items-center gap-2">
                <div class="font-medium">{{ username }}</div>
                <div class="text-sm text-muted-foreground">{{ createdAt }}</div>
            </div>
            <div class="text-muted-foreground text-sm">
                {{ content }}
            </div>

            <div class="flex items-center gap-x-3">
                <Button size="sm" variant="outline">Reply</Button>
                <Button size="sm" variant="ghost" v-if="replies > 0">
                    <Icon icon="material-symbols:keyboard-arrow-down" class="w-5 h-5" />
                    {{ replies }} replies
                </Button>
            </div>
        </div>




        <DropdownMenu>
            <DropdownMenuTrigger as-child>
                <Button variant="ghost" size="icon">
                    <Icon class="!w-5 !h-5" icon="material-symbols:more-vert" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                <DropdownMenuItem>
                    <span>Copy link</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <span>Reply</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    </div>
</template>