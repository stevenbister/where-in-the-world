import { drizzle } from 'drizzle-orm/d1';
import { getContext } from 'hono/context-storage';

import type { AppBindings } from '../types';
import { relations } from './schema/relations';

export const database = () =>
    drizzle(getContext<AppBindings>().env.DB, {
        relations,
    });
