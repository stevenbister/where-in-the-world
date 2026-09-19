import { index, int, snakeCase, text } from 'drizzle-orm/sqlite-core';

import { user } from './auth';
import { entries } from './entries';

export const entryHistory = snakeCase.table(
    'entry_history',
    {
        id: text()
            .primaryKey()
            .$defaultFn(() => crypto.randomUUID()),
        entryId: text()
            .notNull()
            .references(() => entries.id, { onDelete: 'cascade' }),
        editedBy: text()
            .notNull()
            .references(() => user.id, { onDelete: 'restrict' }),
        updatedAt: int({ mode: 'timestamp' })
            .$defaultFn(() => new Date())
            .$onUpdate(() => new Date()),
        changeSummary: text('change_summary').notNull(),
    },
    (t) => [index('entry_history_entry_idx').on(t.entryId, t.updatedAt)]
);

