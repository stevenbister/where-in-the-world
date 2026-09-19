import { MOCK_ENV } from '../../__fixtures__/mock-env';
import app from '../../index';

describe('Health', () => {
    it('returns ok', async () => {
        const response = await app.request('/api/v1/health', {}, MOCK_ENV);
        expect(response.status).toBe(200);
        expect(await response.text()).toBe('ok');
    });
});
