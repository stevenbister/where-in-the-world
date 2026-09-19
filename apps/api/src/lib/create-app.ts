import { OpenAPIHono } from '@hono/zod-openapi';
import { contextStorage } from 'hono/context-storage';
import { cors } from 'hono/cors';
import { csrf } from 'hono/csrf';
import { requestId } from 'hono/request-id';
import { secureHeaders } from 'hono/secure-headers';
import { trimTrailingSlash } from 'hono/trailing-slash';

import type { AppBindings } from '../types';

export const createRouter = () => {
    return new OpenAPIHono<AppBindings>();
};

export const createApp = () => {
    const app = createRouter();

    app.use(contextStorage());
    app.use(secureHeaders());
    app.use(cors());
    app.use(csrf());
    app.use(requestId());
    app.use(trimTrailingSlash());

    app.notFound((c) => c.json({ error: 'Not Found' }, 404));

    return app;
};
