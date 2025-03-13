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

const replies = computed(() => comments.value.length >= props.replies ? comments.value.length : props.replies)
const createdAt = computed(() => useFormattedDate(props.createdAt))
const commentUrl = `/blog/${props.postId}/comments/${props.id}`


const router = useRouter()
const { copy, isSupported } = useClipboard()
const { toast } = useToast()

const { getReplies, fetchReplies } = useComments()


const comments = getReplies(props.id)

const isReplying = ref(false)
const isLoadingComments = ref(false)
const showReplies = ref(false)
const isRepliesLoaded = ref(false)

const displayReplies = async () => {
    if (props.depth >= 3) {
        router.push(commentUrl)
        return
    }

    showReplies.value = !showReplies.value

    if (isRepliesLoaded.value) return



    try {

        setTimeout(() => {
            if (!isRepliesLoaded)
                isLoadingComments.value = isLoadingComments.value
        }, 100)


        await fetchReplies(props.id)

        isRepliesLoaded.value = true


    } catch (err) {

    } finally {

        isLoadingComments.value = false
    }

}


const copyLink = async () => {
    const source = `${window.origin}${commentUrl}`

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


        <div class="pl-10 flex items-center w-full justify-center" v-if="isLoadingComments">
            <div>
                <svg class="text-gray-300 animate-spin w-5 h-5" viewBox="0 0 64 64" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                        stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
                    </path>
                    <path
                        d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                        stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"
                        class="text-gray-900">
                    </path>
                </svg>
            </div>

        </div>

        <CommentList class="pl-10 mt-10" v-else-if="showReplies" :comments="comments" :depth="depth + 1">
        </CommentList>



    </div>
</template>