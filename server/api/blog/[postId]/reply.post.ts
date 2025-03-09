import { useValidatedBody, useValidatedParams, z, zh } from 'h3-zod'
import { tables, useDrizzle } from '~/server/utils/drizzle'

defineRouteMeta({
    openAPI: {
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        type: "object",
                        properties: {
                            content: { type: "string" },
                        },
                        required: ["content"],
                    },
                }
            }
        }
    }
})
export default defineEventHandler(async (event) => {
    const { postId } = await useValidatedParams(event, {
        postId: z.string()
    })

    const data = await useValidatedBody(event, {
        content: z.string(),
    })

    const { user } = await requireUserSession(event)

    const comment = await useDrizzle().insert(tables.comments).values({
        content: data.content,
        postId,
        userId: user.id,
        createdAt: new Date(),
        userAvatar: user.image,
        username: user.name
    }).returning().get()

    return comment
})