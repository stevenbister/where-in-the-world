import { OpenAPIHono } from '@hono/zod-openapi';
import { contextStorage } from 'hono/context-storage';
import { secureHeaders } from 'hono/secure-headers';

import type { AppBindings } from '../types';

export const createRouter = () => {
    return new OpenAPIHono<AppBindings>();
};

export const createApp = () => {
    const app = createRouter();

    app.use(secureHeaders());
    app.use(contextStorage());

    app.notFound((c) => c.json({ error: 'Not Found' }, 404));

    return app;
};
