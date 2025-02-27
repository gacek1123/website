CREATE TABLE `comments` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`post_id` text NOT NULL,
	`upvote_count` integer DEFAULT 0,
	`downvote_count` integer DEFAULT 0,
	`content` text(500) NOT NULL,
	`replied_comment_id` integer,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`replied_comment_id`) REFERENCES `comments`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`replied_comment_id`) REFERENCES `comments`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `comments_post_id_unique` ON `comments` (`post_id`);--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `comments` (`user_id`);--> statement-breakpoint
DROP TABLE `todos`;