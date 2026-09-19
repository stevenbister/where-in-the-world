import { createRoute, z } from '@hono/zod-openapi';

import { text } from '../../lib/responses';

export type HealthRoute = typeof health;

export const health = createRoute({
    method: 'get',
    path: '/health',
    summary: 'Healthcheck',
    description: 'Returns the health status of the API.',
    responses: {
        200: text(z.literal('ok'), 'API status is healthy.'),
    },
});
