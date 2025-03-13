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
import { useClipboard } from '@vueuse/core'
import { type Comment } from '~/composables/useComments';
import { useToast } from '../ui/toast';
import useComments from '~/composables/useComments';


const props = defineProps<{
    content: string,
    createdAt: string,
    id: number,
    username: string
    userAvatar: string
    repliedCommentId: number | null
    upvoteCount: number
    downvoteCount: number
    replies: number
    postId: string,
    userId: string
    depth: number
}>()

const { getReplies, fetchReplies } = useComments()

const comments = getReplies(props.id)

const router = useRouter()

const replies = computed(() => comments.value.length >= props.replies ? comments.value.length : props.replies)

const createdAt = computed(() => useFormattedDate(props.createdAt))

const isReplying = ref(false)
const showReplies = ref(false)

function commentUrl(comment: Comment): string {
    return `/blog/${comment.postId}/comments/${comment.id}`
}

const url = commentUrl(props)



const displayReplies = async () => {
    if (props.depth >= 3) {
        router.push(url)

        return
    }

    await fetchReplies(props.id)

    showReplies.value = !showReplies.value
}

const { copy, isSupported } = useClipboard()

const { toast } = useToast()

const copyLink = async () => {
    const source = `${window.origin}${url}`


    if (!isSupported.value) {
        toast({
            title: 'Error.',
            description: `Your browser doesn't support copying to clipboard. Please copy the link manually: ${source}`,
        })
    }

    try {
        await copy(source)

        toast({
            title: 'Success!',
            description: 'Link copied to clipboard.',
        })
    } catch (err) {

        toast({
            title: 'Oops!',
            description: 'Something went wrong while copying the link.',
        })
    }
}

</script>

<template>
    <div>
        <div class="flex items-start gap-4 p-2 rounded-md" :id="`comment-${id}`">
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

                    <Button v-if="replies > 0" size="sm" variant="ghost" @click="displayReplies">
                        <Icon
                            :icon="showReplies ? 'material-symbols:keyboard-arrow-up' : 'material-symbols:keyboard-arrow-down'"
                            class="w-5 h-5" />
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
                    <DropdownMenuItem @click="copyLink">
                        <span>Copy link</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem @click="isReplying = !isReplying">
                        <span>Reply</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </div>
        <CommentForm class="ml-10 mt-5" v-if="isReplying" :repliedCommentId="id" @close="isReplying = false">
        </CommentForm>

        <CommentList class="pl-10 mt-10" v-if="showReplies" :comments="comments" :depth="depth + 1">
        </CommentList>
    </div>
</template>