ALTER TABLE `comments` ADD `username` text;--> statement-breakpoint
CREATE INDEX `reference_id_idx` ON `comment_replies` (`reference_id`);