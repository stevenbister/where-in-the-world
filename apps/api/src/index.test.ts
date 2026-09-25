import { env } from 'cloudflare:workers';

import app from '.';

describe('index', () => {
    it('serves an interactive OpenAPI documentation page', async () => {
        const response = await app.request('/api/v1/docs', {}, env);

        expect(response.status).toBe(200);
    });
});
