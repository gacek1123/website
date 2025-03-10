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
                        required: ["content", 'postId'],
                    },
                }
            }
        }
    }
})
export default defineEventHandler(async (event) => {
    const { commentId, postId } = await useValidatedParams(event, {
        commentId: zh.intAsString,
        postId: z.string()
    })

    const data = await useValidatedBody(event, {
        content: z.string(),
    })

    const { user } = await requireUserSession(event)

    const comment = await useDrizzle().insert(tables.comments).values({
        content: data.content,
        postId,
        repliedCommentId: commentId,
        userId: user.id,
        createdAt: new Date(),
        userAvatar: user.image,
        username: user.name
    }).returning().get()


    await useDrizzle().insert(tables.commentReplies).values({
        referenceId: commentId,
        commentId: comment.id
    })

    return { ...comment, replies: 0 }
})