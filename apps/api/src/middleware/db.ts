import { createMiddleware } from 'hono/factory';

import { createDatabase } from '../db';

export const dbConnect = createMiddleware(async (c, next) => {
    c.set('db', createDatabase(c.env.DB));
    await next();
});
