CREATE TABLE `todos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`post_id` text NOT NULL,
	`upvote_count` integer DEFAULT 0,
	`downvote_count` integer DEFAULT 0,
	`content` text(500) NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `todos_post_id_unique` ON `todos` (`post_id`);--> statement-breakpoint
CREATE INDEX `post_id_idx` ON `todos` (`post_id`);