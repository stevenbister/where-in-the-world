import type { OpenAPIHono } from '@hono/zod-openapi';
import { Scalar } from '@scalar/hono-api-reference';

import type { AppBindings } from '../types';

export const configureOpenAPI = (app: OpenAPIHono<AppBindings>) => {
    app.doc('/openapi.json', {
        openapi: '3.1.0',
        info: {
            title: 'Where in the World API',
            version: '0.1.0',
            description: 'API for shared travel logs.',
        },
    });

    app.get('/docs', Scalar({ url: '/openapi.json' }));
};
