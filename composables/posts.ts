export type Post = { title: string, image: string, url: string, createdAt: string, tags: any[] }

export const usePosts = () => {
    const posts = useState<Post[] | undefined>("posts", () => undefined)

    const fetchPosts = async () => {
        if (posts.value) return { posts: posts }

        const { data, error, status } = await useFetch("/api/notion/query-database")

        if (!data.value) return { error, status }

        posts.value = data.value

        return { posts, error, status }
    }


    return { fetchPosts, posts }
}