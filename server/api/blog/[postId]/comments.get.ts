import { count, eq, getTableColumns, isNotNull, isNull } from 'drizzle-orm'
import { useValidatedParams, useValidatedQuery, z } from 'h3-zod'

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
    const { postId } = await useValidatedParams(event, {
        postId: z.string()
    })

    const { limit, offset } = await useValidatedQuery(event, {
        limit: z.number().optional().default(50),
        offset: z.number().optional().default(0)
    })

    return await useDrizzle()
        .select({
            ...getTableColumns(tables.comments),
            replies: count(tables.commentReplies.commentId)
        })
        .from(tables.comments)
        .leftJoin(tables.commentReplies, eq(tables.commentReplies.referenceId, tables.comments.id))
        .groupBy(tables.comments.id)
        .where(and(eq(tables.comments.postId, postId), isNull(tables.comments.repliedCommentId)))
        .orderBy(sql`${tables.comments.createdAt} desc`)
        .limit(limit)
        .offset(offset)
        .all()
})