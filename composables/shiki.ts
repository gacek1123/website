import {
    createHighlighterCore,
    type HighlighterCore
} from 'shiki/core'
import light from '@shikijs/themes/vitesse-light'
import dark from '@shikijs/themes/vitesse-dark'

import { createOnigurumaEngine } from 'shiki/engine/oniguruma'

const _highlighter = () => {
    let highlighter: HighlighterCore | undefined = undefined


    return async () => {
        if (!highlighter)
            highlighter = await createHighlighterCore({
                themes: [light, dark],
                engine: createOnigurumaEngine(import('shiki/wasm'))
            })
        return highlighter
    }
}

export const getHighlighter = _highlighter()



