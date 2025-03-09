import { count, eq, getTableColumns, isNotNull, isNull } from 'drizzle-orm'
import { useValidatedParams, useValidatedQuery, z, zh } from 'h3-zod'

export default defineEventHandler(async (event) => {
    const { commentId } = await useValidatedParams(event, {
        commentId: zh.intAsString
    })


    return (await useDrizzle()
        .select({
            ...getTableColumns(tables.comments),
            replies: count(tables.commentReplies.commentId)
        })
        .from(tables.comments)
        .leftJoin(tables.commentReplies, eq(tables.commentReplies.referenceId, tables.comments.id))
        .groupBy(tables.comments.id)
        .where(eq(tables.comments.id, commentId))
        .orderBy(sql`${tables.comments.createdAt} desc`)
        .limit(1))[0]
})