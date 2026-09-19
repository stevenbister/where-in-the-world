import {
    type AnySQLiteColumn,
    int,
    snakeCase,
    text,
} from 'drizzle-orm/sqlite-core';

import { media } from './media';

export const trips = snakeCase.table('trips', {
    id: text()
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    title: text().notNull(),
    startDate: int({ mode: 'timestamp' }),
    endDate: int({ mode: 'timestamp' }),
    coverPhotoId: text('cover_photo_id').references(
        (): AnySQLiteColumn => media.id,
        { onDelete: 'set null' }
    ),
    createdBy: text(),
    createdAt: int({ mode: 'timestamp' }).$defaultFn(() => new Date()),
    updatedAt: int({ mode: 'timestamp' })
        .$defaultFn(() => new Date())
        .$onUpdate(() => new Date()),
});
