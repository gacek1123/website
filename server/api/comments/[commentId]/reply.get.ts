import { eq } from 'drizzle-orm'
import { useValidatedParams, useValidatedQuery, z, zh } from 'h3-zod'


defineRouteMeta({
    openAPI: {
        parameters: [
            {
                name: 'limit',
                in: 'query',
                required: false,
                schema: {
                    type: 'number'
                }
            },
            {
                name: 'offset',
                in: 'query',
                required: false,
                schema: {
                    type: 'number'
                }
            }
        ]
    }
})
export default defineEventHandler(async (event) => {
    const { commentId } = await useValidatedParams(event, {
        commentId: zh.intAsString
    })

    const { limit, offset } = await useValidatedQuery(event, {
        limit: z.number().optional().default(50),
        offset: z.number().optional().default(0)
    })

    return await useDrizzle().select().from(tables.comments).where(eq(tables.comments.repliedCommentId, commentId)).limit(limit).offset(offset).all()
})