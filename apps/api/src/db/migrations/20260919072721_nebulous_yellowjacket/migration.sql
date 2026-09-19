CREATE TABLE `entries` (
	`id` text PRIMARY KEY,
	`trip_id` text NOT NULL,
	`author_id` text NOT NULL,
	`note` text,
	`entry_date` integer NOT NULL,
	`lat` real,
	`lng` real,
	`tag` text,
	`is_deleted` integer DEFAULT false NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	CONSTRAINT `fk_entries_trip_id_trips_id_fk` FOREIGN KEY (`trip_id`) REFERENCES `trips`(`id`) ON DELETE CASCADE,
	CONSTRAINT `fk_entries_author_id_user_id_fk` FOREIGN KEY (`author_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT
);
--> statement-breakpoint
CREATE TABLE `entry_history` (
	`id` text PRIMARY KEY,
	`entry_id` text NOT NULL,
	`edited_by` text NOT NULL,
	`updated_at` integer,
	`change_summary` text NOT NULL,
	CONSTRAINT `fk_entry_history_entry_id_entries_id_fk` FOREIGN KEY (`entry_id`) REFERENCES `entries`(`id`) ON DELETE CASCADE,
	CONSTRAINT `fk_entry_history_edited_by_user_id_fk` FOREIGN KEY (`edited_by`) REFERENCES `user`(`id`) ON DELETE RESTRICT
);
--> statement-breakpoint
CREATE TABLE `media` (
	`id` text PRIMARY KEY,
	`entry_id` text NOT NULL,
	`picked_by_user_id` text NOT NULL,
	`google_media_id` text NOT NULL,
	`base_url` text,
	`base_url_expires_at` integer,
	`local_thumbnail_uri` text,
	`type` text DEFAULT 'photo' NOT NULL,
	`created_at` integer,
	`updated_at` integer,
	CONSTRAINT `fk_media_entry_id_entries_id_fk` FOREIGN KEY (`entry_id`) REFERENCES `entries`(`id`) ON DELETE CASCADE,
	CONSTRAINT `fk_media_picked_by_user_id_user_id_fk` FOREIGN KEY (`picked_by_user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT
);
--> statement-breakpoint
CREATE TABLE `trip_members` (
	`trip_id` text NOT NULL,
	`user_id` text NOT NULL,
	CONSTRAINT `trip_members_pk` PRIMARY KEY(`trip_id`, `user_id`),
	CONSTRAINT `fk_trip_members_trip_id_trips_id_fk` FOREIGN KEY (`trip_id`) REFERENCES `trips`(`id`) ON DELETE CASCADE,
	CONSTRAINT `fk_trip_members_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_trips` (
	`id` text PRIMARY KEY,
	`title` text NOT NULL,
	`start_date` integer,
	`end_date` integer,
	`cover_photo_id` text,
	`created_by` text,
	`created_at` integer,
	`updated_at` integer,
	CONSTRAINT `fk_trips_cover_photo_id_media_id_fk` FOREIGN KEY (`cover_photo_id`) REFERENCES `media`(`id`) ON DELETE SET NULL
);
--> statement-breakpoint
INSERT INTO `__new_trips`(`id`, `title`, `start_date`, `end_date`, `cover_photo_id`, `created_by`, `created_at`, `updated_at`) SELECT `id`, `title`, `start_date`, `end_date`, `cover_photo_id`, `created_by`, `created_at`, `updated_at` FROM `trips`;--> statement-breakpoint
DROP TABLE `trips`;--> statement-breakpoint
ALTER TABLE `__new_trips` RENAME TO `trips`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE INDEX `entries_trip_updated_idx` ON `entries` (`trip_id`,`updated_at`);--> statement-breakpoint
CREATE INDEX `entries_trip_date_idx` ON `entries` (`trip_id`,`entry_date`);--> statement-breakpoint
CREATE INDEX `entries_trip_tag_idx` ON `entries` (`trip_id`,`tag`);--> statement-breakpoint
CREATE INDEX `entries_author_idx` ON `entries` (`author_id`);--> statement-breakpoint
CREATE INDEX `entry_history_entry_idx` ON `entry_history` (`entry_id`,`updated_at`);--> statement-breakpoint
CREATE INDEX `media_entry_idx` ON `media` (`entry_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `media_entry_google_uq` ON `media` (`entry_id`,`google_media_id`);--> statement-breakpoint
CREATE INDEX `trip_members_user_idx` ON `trip_members` (`user_id`);