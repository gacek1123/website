import type { BlockObjectResponse, ListBlockChildrenResponse, PartialBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import type { Post } from "~/shared/notion/post"
import { FetchError } from 'ofetch'
import type { AsyncDataRequestStatus } from "#app"


export const usePostId = () => {
    const route = useRoute();
    const postId = route.params.post as string

    return postId
}

export const usePosts = () => {
    const posts = useState<Post[]>("posts", () => [])

    async function fetchPosts(): Promise<{ posts?: Ref<Post[]>, error?: Ref<FetchError | null>, status?: Ref<AsyncDataRequestStatus> }> {
        if (posts.value.length) return { posts }

        const { data, error, status } = await useFetch("/api/notion/query-database")

        if (error.value || !data.value) return { error, status }

        posts.value = data.value

        return { posts }
    }


    async function fetchPost(postId: string) {
        const data = await useFetch<Post>("/api/notion/page/" + postId, {
            getCachedData(key, nuxt) {
                return nuxt.isHydrating ? nuxt.payload.data[key] : findPost(postId)
            }
        })

        return data
    }


    const findPost = (postId: string) => posts.value.find(({ id }) => id === postId)

    const latestPosts = computed(() => posts.value.slice(0, 2))

    return { fetchPosts, posts, fetchPost, latestPosts, findPost }
}

type Blocks = {
    hasMore: boolean;
    blocks: (BlockObjectResponse | PartialBlockObjectResponse)[];
    nextCursor: string | null;
};

export const usePostBlocks = () => {
    const blocksCache = useState<Record<string, Blocks>>(() => ({}));

    async function fetchBlocks(postId: string) {
        const cachedBlock = blocksCache.value[postId] ??= { hasMore: true, blocks: [], nextCursor: null };

        if (!cachedBlock.hasMore) return;

        const data = await $fetch<ListBlockChildrenResponse>(`/api/notion/blocks/${postId}`, {
            params: cachedBlock.nextCursor ? { start_cursor: cachedBlock.nextCursor } : {}
        });


        cachedBlock.hasMore = data.has_more;
        cachedBlock.nextCursor = data.next_cursor;
        cachedBlock.blocks = [...cachedBlock.blocks, ...data.results];

        return cachedBlock
    }

    function usePostBlocksData(postId: string) {
        return blocksCache.value[postId] ?? { hasMore: true, blocks: [], nextCursor: null }
    }

    return {
        fetchBlocks,
        usePostBlocksData
    };
};
