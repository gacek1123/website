import { sqliteTable, text, integer, index, AnySQLiteColumn } from 'drizzle-orm/sqlite-core'

export const comments = sqliteTable('comments', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    postId: text('post_id').notNull(),
    upvoteCount: integer('upvote_count').default(0),
    downvoteCount: integer('downvote_count').default(0),
    content: text('content', { length: 500 }).notNull(),
    repliedCommentId: integer('replied_comment_id').references((): AnySQLiteColumn => comments.id),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
    username: text('username').notNull(),
    userAvatar: text('user_avatar').notNull(),
    userId: text('user_id').notNull()
}, (table) => [
    index("post_id_idx").on(table.postId),
    index('user_id_idx').on(table.userId),
])


export const commentReplies = sqliteTable('comment_replies', {
    commentId: integer('comment_id').notNull().references((): AnySQLiteColumn => comments.id),
    referenceId: integer('reference_id').notNull().references((): AnySQLiteColumn => comments.id)
}, (table) => [index('reference_id_idx').on(table.referenceId)])