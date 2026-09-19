import { drizzle } from 'drizzle-orm/d1';

import { relations } from './schema/relations';

export const createDatabase = (client: D1Database) =>
    drizzle(client, {
        relations,
    });
