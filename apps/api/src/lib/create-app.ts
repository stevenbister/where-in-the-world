import { OpenAPIHono } from '@hono/zod-openapi';
import { contextStorage } from 'hono/context-storage';
import { cors } from 'hono/cors';
import { csrf } from 'hono/csrf';
import { requestId } from 'hono/request-id';
import { secureHeaders } from 'hono/secure-headers';
import { trimTrailingSlash } from 'hono/trailing-slash';

import type { AppBindings } from '../types';
import { configureBetterAuth } from './configure-better-auth';

export const createRouter = () => {
    return new OpenAPIHono<AppBindings>();
};

export const createApp = () => {
    const app = createRouter().basePath('/api/v1');

    app.use(contextStorage());
    app.use(secureHeaders());
    app.use(cors());
    app.use(csrf());
    app.use(requestId());
    app.use(trimTrailingSlash());

    /**
     * app.all() forwards every HTTP method to Better Auth using the raw Web Standard Request from c.req.raw.
     * Better Auth validates the method and returns a Response that Hono sends directly.
     * Make sure to register the auth route before any catch-all route that could handle the request first.
     */
    app.all('/auth/*', async (c) => {
        const betterAuth = configureBetterAuth();

        return betterAuth.handler(c.req.raw);
    });

    app.notFound((c) => c.json({ error: 'Not Found' }, 404));

    return app;
};
