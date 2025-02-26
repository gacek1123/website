import { sqliteTable, text, integer, index, AnySQLiteColumn, foreignKey } from 'drizzle-orm/sqlite-core'

export const comments = sqliteTable('comments', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    userId: text('user_id').notNull(),
    postId: text('post_id').notNull().unique(),
    upvoteCount: integer('upvote_count').default(0),
    downvoteCount: integer('downvote_count').default(0),
    content: text('content', { length: 500 }).notNull(),
    repliedCommentId: integer('replied_comment_id').references((): AnySQLiteColumn => comments.id),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
}, (table) => [
    index("post_id_idx").on(table.postId),
    index('user_id_idx').on(table.userId),
    foreignKey({
        columns: [table.repliedCommentId],
        foreignColumns: [table.id],
        name: "custom_fk"
    })
])