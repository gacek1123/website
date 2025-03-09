import { count, eq, getTableColumns, isNull } from 'drizzle-orm'
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


    return await useDrizzle()
        .select({
            ...getTableColumns(tables.comments),
            replies: count(tables.commentReplies.commentId)
        })
        .from(tables.comments)
        .leftJoin(tables.commentReplies, eq(tables.commentReplies.referenceId, tables.comments.id))
        .groupBy(tables.comments.id)
        .where(and(eq(tables.comments.repliedCommentId, commentId)))
        .orderBy(sql`${tables.comments.createdAt} desc`)
        .limit(limit)
        .offset(offset)
        .all()
})