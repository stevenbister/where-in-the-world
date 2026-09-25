import { env } from 'cloudflare:workers';
import type { Context } from 'hono';

import { MOCK_SESSION } from '../__fixtures__/session';
import type { AppBindings, Session } from '../types';
import { requireAuth } from './require-auth';

vi.unmock('./session');

vi.mock('../lib/configure-better-auth', () => ({
    configureBetterAuth: vi.fn(),
}));

const mockContext = {
    req: {
        raw: new Request('https://example.com', {
            headers: { 'Content-Type': 'application/json' },
        }),
    },
    get: vi.fn(),
    set: vi.fn(),
    env,
    json: vi.fn(),
} as unknown as Context<AppBindings, string, object>;

const mockNext = vi.fn();

const setup = async (sessionValue: Session | null = null) => {
    mockContext.get = vi.fn().mockReturnValue(sessionValue);
    await requireAuth(mockContext, mockNext);
};

describe('requireAuth middleware', () => {
    afterEach(() => {
        vi.resetAllMocks();
    });

    it('returns forbidden when the user is not authenticated', async () => {
        await setup();

        expect(mockContext.json).toHaveBeenCalledWith(
            {
                error: 'Forbidden',
            },
            401
        );
        expect(mockNext).not.toHaveBeenCalled();
    });

    it('passes through when the user is authenticated', async () => {
        await setup(MOCK_SESSION);

        expect(mockNext).toHaveBeenCalled();
        expect(mockContext.json).not.toHaveBeenCalled();
    });
});
