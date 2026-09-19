import { configureOpenAPI } from './lib/configure-open-api';
import { createApp } from './lib/create-app';
import { healthCheckRoutes } from './routes/health/health.index';

const app = createApp();

app.basePath('/api/v1');
app.route('/', healthCheckRoutes);

configureOpenAPI(app);

export default app;
