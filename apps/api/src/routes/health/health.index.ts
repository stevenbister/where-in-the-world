import { createRouter } from '../../lib/create-app';
import { ok } from './health.handlers';
import { health } from './health.routes';

export const healthCheckRoutes = createRouter().openapi(health, ok);
