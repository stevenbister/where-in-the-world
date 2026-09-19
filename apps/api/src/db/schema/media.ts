import {
    index,
    int,
    snakeCase,
    text,
    uniqueIndex,
} from 'drizzle-orm/sqlite-core';

import { user } from './auth';
import { entries } from './entries';

export const media = snakeCase.table(
    'media',
    {
        id: text()
            .primaryKey()
            .$defaultFn(() => crypto.randomUUID()),
        entryId: text()
            .notNull()
            .references(() => entries.id, { onDelete: 'cascade' }),
        pickedByUserId: text()
            .notNull()
            .references(() => user.id, { onDelete: 'restrict' }),
        googleMediaId: text().notNull(),
        baseUrl: text(),
        baseUrlExpiresAt: int({ mode: 'timestamp' }),
        // Device-local path; only meaningful on the device that cached it
        localThumbnailUri: text(),
        type: text('type').notNull().default('photo'),
        createdAt: int({ mode: 'timestamp' }).$defaultFn(() => new Date()),
        updatedAt: int({ mode: 'timestamp' })
            .$defaultFn(() => new Date())
            .$onUpdate(() => new Date()),
    },
    (t) => [
        index('media_entry_idx').on(t.entryId),
        uniqueIndex('media_entry_google_uq').on(t.entryId, t.googleMediaId),
    ]
);

