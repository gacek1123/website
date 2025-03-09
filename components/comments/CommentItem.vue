<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Icon } from '@iconify/vue';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import CommentForm from './CommentForm.vue';
import CommentList from './CommentList.vue';

const props = defineProps<{
    content: string,
    createdAt: string,
    id: number,
    username: string
    userAvatar: string
    repliedCommentId: number | null
    upvoteCount: number
    downvoteCount: number
    replies?: number
    postId: string,
    userId: string
}>()

const createdAt = useFormattedDate(props.createdAt)

const isReplying = ref(false)
const showReplies = ref(false)
const repliesLoaded = ref(false)


const postId = usePostId()

const { fetchReplies } = useComments()

const displayReplies = async () => {
    showReplies.value = !showReplies.value

    if (repliesLoaded.value) return

    await fetchReplies(props.id, postId)
    repliesLoaded.value = true
}

</script>

<template>
    <div>
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

                <div class="flex items-center gap-x-3" v-if="!isReplying">
                    <Button @click="isReplying = !isReplying" size="sm" variant="outline">Reply</Button>
                    <Button v-if="replies && replies > 0" size="sm" variant="ghost" @click="displayReplies">
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
                    <DropdownMenuItem @click="isReplying = !isReplying">
                        <span>Reply</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </div>
        <CommentForm class="ml-10 mt-5" v-if="isReplying" :replied-comment-id="id" @close="isReplying = false">
        </CommentForm>

        <CommentList v-if="showReplies" :replied-comment-id="id" class="pl-10 mt-10"></CommentList>
    </div>
</template>