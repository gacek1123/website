export const usePosts = () => {
    const fetchPosts = () => {
        const { data: posts, error } = useFetch("/api/notion/query-database")

        if (error.value) {
            console.log(error.value)
            throw createError({
                ...error.value,
                message: "Couldn't fetch posts."
            })
        }


        return posts.value
    }

    return { fetchPosts }
}