import type { AppBindings } from '../types';

export const MOCK_ENV: Partial<AppBindings['Bindings']> = {
    DB: {
        prepare: jest.fn(),
        batch: jest.fn(),
        exec: jest.fn(),
        withSession: jest.fn(),
        dump: jest.fn(),
    },
};
