import { createRoute, z } from '@hono/zod-openapi';

import { text } from '../../lib/response-schema';

const tags = ['Health'];

export type HealthRoute = typeof health;

export const health = createRoute({
    method: 'get',
    path: '/health',
    summary: 'Healthcheck',
    description: 'Returns the health status of the API.',
    tags,
    responses: {
        200: text(z.literal('ok'), 'API status is healthy.'),
    },
});
