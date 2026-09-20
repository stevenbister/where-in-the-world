import type { AppBindings } from '../types';

export const MOCK_ENV: Partial<AppBindings['Bindings']> = {
    DB: {
        prepare: vi.fn(),
        batch: vi.fn(),
        exec: vi.fn(),
        withSession: vi.fn(),
        dump: vi.fn(),
    },
};
