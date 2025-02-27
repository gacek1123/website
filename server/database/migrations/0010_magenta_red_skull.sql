DELETE FROM comment_replies;
DELETE FROM comments;

PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_comments` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`post_id` text NOT NULL,
	`upvote_count` integer DEFAULT 0,
	`downvote_count` integer DEFAULT 0,
	`content` text(500) NOT NULL,
	`replied_comment_id` integer,
	`created_at` integer NOT NULL,
	`username` text NOT NULL,
	`user_avatar` text NOT NULL,
	`user_id` text NOT NULL,
	FOREIGN KEY (`replied_comment_id`) REFERENCES `comments`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_comments`("id", "post_id", "upvote_count", "downvote_count", "content", "replied_comment_id", "created_at", "username", "user_avatar", "user_id") SELECT "id", "post_id", "upvote_count", "downvote_count", "content", "replied_comment_id", "created_at", "username", "user_avatar", "user_id" FROM `comments`;--> statement-breakpoint
DROP TABLE `comments`;--> statement-breakpoint
ALTER TABLE `__new_comments` RENAME TO `comments`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE INDEX `post_id_idx` ON `comments` (`post_id`);--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `comments` (`user_id`);