import type { BlockObjectResponse, PageObjectResponse, RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

export type NotionColors = RichTextItemResponse['annotations']['color']

export function notionColorToCss(color: NotionColors): string {
    const colors: Record<NotionColors, string> = {
        default: '',
        gray: 'color: #6b7280',
        brown: 'color: #9a3412',
        orange: 'color: #f97316',
        yellow: 'color: #eab308',
        green: 'color: #22c55e',
        blue: 'color: #3b82f6',
        purple: 'color: #a855f7',
        pink: 'color: #ec4899',
        red: 'color: #ef4444',
        gray_background: 'background-color: #f3f4f6',
        brown_background: 'background-color: #fef3c7',
        orange_background: 'background-color: #ffedd5',
        yellow_background: 'background-color: #fef9c3',
        green_background: 'background-color: #dcfce7',
        blue_background: 'background-color: #dbeafe',
        purple_background: 'background-color: #f3e8ff',
        pink_background: 'background-color: #fce7f3',
        red_background: 'background-color: #fee2e2',
        default_background: ''
    }

    return colors[color]
}

export function isType<T extends BlockObjectResponse, U extends T["type"]>(
    block: T,
    ...types: U[]
): block is T & { type: U } {
    for (let t of types) if (t === block.type) return true

    return false
}

type TextPropertyType = "rich_text" | "title" | "url" | "created_time"

const allowedTypes = new Set(["rich_text", "title", "url", "created_time"])

export function isText(type: Property["type"]): type is TextPropertyType {
    return allowedTypes.has(type)
}

export function getTextProperty(prop: Property | undefined): string | undefined {
    if (!prop) return

    if (!isText(prop.type)) return

    const res = getProperty(prop, prop.type)

    if (!res) return ""

    if (Array.isArray(res))
        return res[0].plain_text


    return res
}

type Property = PageObjectResponse["properties"][string]

type _Combine<T, K extends PropertyKey = T extends unknown ? keyof T : never> =
    T extends unknown ? T & Partial<Record<Exclude<K, keyof T>, never>> : never;

type Combine<T> = { [K in keyof _Combine<T>]: _Combine<T>[K] }

export function getProperty<K extends keyof Combine<Property>>(prop: Combine<Property> | undefined, type: K) {
    if (!prop) return

    if (type in prop)
        return prop[type]
}

