
// import type { FetchOptions, ResponseType } from 'ofetch'


// export default async function useFetchWrapper(url: string, options: FetchOptions = {}) {


//     const abortController = new AbortController();


//     const isLoading = ref(false)
//     const error = ref<Error>()
//     const data = ref<any>()


//     try {
//         isLoading.value = true

//         const data = await $fetch(url, options)

//     } catch (err) {

//     } finally {
//         isLoading.value = false
//     }



//     return {
//         isLoading,
//         error,
//         data,
//     }
// }