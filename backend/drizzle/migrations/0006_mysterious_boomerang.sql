CREATE TABLE `loans` (
	`user_id` integer NOT NULL,
	`book_id` integer NOT NULL,
	`volume` integer DEFAULT 1 NOT NULL,
	`created_at` text DEFAULT (datetime(current_timestamp, '+9 hours')) NOT NULL,
	`updated_at` text DEFAULT (datetime(current_timestamp, '+9 hours')) NOT NULL,
	PRIMARY KEY(`book_id`, `user_id`),
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`book_id`) REFERENCES `books`(`id`) ON UPDATE no action ON DELETE cascade
);
