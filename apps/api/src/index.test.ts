import app from '.';
import { MOCK_ENV } from './__fixtures__/mock-env';

describe('index', () => {
    it('serves an interactive OpenAPI documentation page', async () => {
        const response = await app.request('/api/v1/docs', {}, MOCK_ENV);

        expect(response.status).toBe(200);
    });
});
