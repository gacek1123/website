import { joinURL, encodeQueryItem } from 'ufo'
import { createOperationsGenerator } from '#image'
import type { ProviderGetImage } from '@nuxt/image'

// https://github.com/nuxt/image/blob/main/src/runtime/providers/cloudflare.ts
const operationsGenerator = createOperationsGenerator({
    keyMap: {
        width: 'w',
        height: 'h',
        dpr: 'dpr',
        fit: 'fit',
        gravity: 'g',
        quality: 'q',
        format: 'f',
        sharpen: 'sharpen',
    },
    valueMap: {
        fit: {
            cover: 'cover',
            contain: 'contain',
            fill: 'scale-down',
            outside: 'crop',
            inside: 'pad',
        },
        gravity: {
            auto: 'auto',
            side: 'side',
        },
    },
    joinWith: ',',
    formatter: (key, val) => encodeQueryItem(key, val),
})

const defaultModifiers = {}

// https://developers.cloudflare.com/images/image-resizing/url-format/
export const getImage: ProviderGetImage = (src, {
    modifiers = {},
    baseURL = '/',
    accountHash = ''
} = {}) => {
    const mergeModifiers = { ...defaultModifiers, ...modifiers }
    const operations = operationsGenerator(mergeModifiers as any)

    // https://fszarek.me/cdn-cgi/imagedelivery/gC77PfJa-d3eBOxGPxtDxw/b224f771-431f-45aa-dee9-51c615e5ff00/public
    const url = operations ? joinURL(baseURL, 'cdn-cgi/imagedelivery', accountHash, src, operations) : joinURL(baseURL, src)

    return {
        url,
    }
}