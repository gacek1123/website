import { useValidatedBody, z, zh } from 'h3-zod'
import { tables, useDrizzle } from '~/server/utils/drizzle'

export default defineEventHandler(async (event) => {
    const data = await useValidatedBody(event, {
        content: z.string(),
        postId: z.string()
    })

    const { user } = await requireUserSession(event)

    const comment = await useDrizzle().insert(tables.comments).values({
        content: data.content,
        postId: data.postId,
        userId: user.id,
        createdAt: new Date()
    }).returning().get()

    return comment
})