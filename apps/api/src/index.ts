import { configureOpenAPI } from './lib/configure-open-api';
import { createApp } from './lib/create-app';
import { healthCheckRoutes } from './routes/health/health.index';
import { tripRoutes } from './routes/trips/trips.index';

const app = createApp();

app.openapiRoutes([...healthCheckRoutes, ...tripRoutes] as const);

configureOpenAPI(app);

export default app;
