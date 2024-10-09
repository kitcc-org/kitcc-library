CREATE TABLE `books` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`author` text NOT NULL,
	`publisher` text NOT NULL,
	`thumbnail` text,
	`isbn` text NOT NULL,
	`stock` integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `books_isbn_unique` ON `books` (`isbn`);--> statement-breakpoint
CREATE UNIQUE INDEX `isbn_idx` ON `books` (`isbn`);