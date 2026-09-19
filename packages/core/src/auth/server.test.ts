import type { DB } from 'better-auth/adapters/drizzle';

import { auth, defaultOptions } from './server';

jest.mock('better-auth', () => ({
    betterAuth: jest.fn(),
}));

const mockDrizzleAdapter = jest.fn();
jest.mock('better-auth/adapters/drizzle', () => ({
    drizzleAdapter: () => mockDrizzleAdapter,
}));

jest.mock('better-auth/plugins/admin', () => ({
    admin: () => ({ id: 'admin' }),
}));

const mockDB: DB = {
    prepare: jest.fn(),
    dump: jest.fn(),
    batch: jest.fn(),
    exec: jest.fn(),
};

const mockOptions = {
    baseURL: 'https://example.com',
    hashFn: jest.fn(),
    verifyFn: jest.fn(),
    trustedOrigins: ['http://localhost:5173'],
    secret: 'secret',
};

describe('auth', () => {
    it('calls betterAuth with correct options', async () => {
        auth(mockDB, mockOptions);
        expect(require('better-auth').betterAuth).toHaveBeenCalledWith({
            database: mockDrizzleAdapter,
            plugins: [{ id: 'admin' }],
            ...defaultOptions,
            ...mockOptions,
        });
    });

    it('throws error if DB is not provided', async () => {
        // @ts-expect-error - DB is required but explicitly not provided
        expect(() => auth(undefined)).toThrow('DB is required');
    });
});
