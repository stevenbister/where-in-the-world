import app from '../../index';
import type { AppBindings } from '../../types';

const MOCK_ENV: Partial<AppBindings['Bindings']> = {
    DB: {
        prepare: jest.fn(),
        batch: jest.fn(),
        exec: jest.fn(),
        withSession: jest.fn(),
        dump: jest.fn(),
    },
};

describe('Health', () => {
    it('returns ok', async () => {
        const response = await app.request('/health', {}, MOCK_ENV);
        expect(response.status).toBe(200);
        expect(await response.text()).toBe('ok');
    });
});
