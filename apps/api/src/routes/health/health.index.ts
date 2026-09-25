import { defineOpenAPIRoute } from '@hono/zod-openapi';

import { ok } from './health.handlers';
import { health } from './health.routes';

export const healthCheckRoutes = [
    defineOpenAPIRoute({
        route: health,
        handler: ok,
    }),
] as const;
