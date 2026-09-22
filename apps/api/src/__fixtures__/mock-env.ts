import type { AppBindings } from '../types';

export const MOCK_ENV: Partial<AppBindings['Bindings']> = {
    DB: {
        prepare: vi.fn(),
        batch: vi.fn(),
        exec: vi.fn(),
        withSession: vi.fn(),
        dump: vi.fn(),
    },
    BETTER_AUTH_SECRET: 'super-secret-string',
    BETTER_AUTH_URL: 'http://127.0.0.1:8787',
};
