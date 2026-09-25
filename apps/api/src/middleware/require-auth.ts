import { createMiddleware } from 'hono/factory';

import type { AppBindings } from '../types';

export const requireAuth = createMiddleware<AppBindings>(async (c, next) => {
    const session = c.get('session');

    if (!session) {
        return c.json({ error: 'Forbidden' }, 401);
    }

    c.set('session', session);
    await next();
});
