import { OpenAPIHono } from '@hono/zod-openapi';

import { dbConnect } from '../middleware/db';
import type { AppBindings } from '../types';

export const createRouter = () => {
    return new OpenAPIHono<AppBindings>();
};

export const createApp = () => {
    const app = createRouter();

    app.use(dbConnect);

    app.notFound((c) => c.json({ error: 'Not Found' }, 404));

    return app;
};
