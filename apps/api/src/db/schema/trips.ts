import {
    type AnySQLiteColumn,
    int,
    snakeCase,
    text,
} from 'drizzle-orm/sqlite-core';
import {
    createInsertSchema,
    createSelectSchema,
    createUpdateSchema,
} from 'drizzle-zod';
import { z } from 'zod';

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

export const selectTripSchema = createSelectSchema(trips);
export const insertTripSchema = createInsertSchema(trips, {
    startDate: z.coerce.date().nullish(),
    endDate: z.coerce.date().nullish(),
    createdAt: z.coerce.date().nullish(),
    updatedAt: z.coerce.date().nullish(),
});
export const updateTripSchema = createUpdateSchema(trips, {
    startDate: z.coerce.date().nullish(),
    endDate: z.coerce.date().nullish(),
    createdAt: z.coerce.date().nullish(),
    updatedAt: z.coerce.date().nullish(),
});
