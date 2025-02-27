CREATE TABLE `comment_replies` (
	`comment_id` integer NOT NULL,
	`reference_id` integer NOT NULL,
	FOREIGN KEY (`comment_id`) REFERENCES `comments`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`reference_id`) REFERENCES `comments`(`id`) ON UPDATE no action ON DELETE no action
);
