import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import { getProperty, getTextProperty } from "./utils"

export type Post = { title: string, image?: string, url?: string, createdAt: string, tags: any[], id: string, description?: string, lastEditedTime: string }

export function parsePost(result: PageObjectResponse): Post {
    const { Title, Description, Tags, URL: Url, Published, ["Cover image"]: CoverImage, title } = result.properties

    return {
        tags: getProperty(Tags, "multi_select") ?? [],
        image: getTextProperty(CoverImage),
        title: getTextProperty(Title ?? title) || '',
        description: getTextProperty(Description),
        url: getTextProperty(Url),
        createdAt: getTextProperty(Published) ?? result.created_time,
        id: result.id,
        lastEditedTime: result.last_edited_time
    }
}
