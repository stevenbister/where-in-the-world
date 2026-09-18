CREATE TABLE `trips` (
	`id` text PRIMARY KEY,
	`title` text NOT NULL,
	`start_date` integer,
	`end_date` integer,
	`cover_photo_id` text,
	`created_by` text,
	`created_at` integer,
	`updated_at` integer
);
