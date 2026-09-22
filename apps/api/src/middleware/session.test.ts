import type { Context } from 'hono';

import { MOCK_ENV } from '../__fixtures__/mock-env';
import { MOCK_SESSION } from '../__fixtures__/session';
import { configureBetterAuth } from '../lib/configure-better-auth';
import type { AppBindings, Session } from '../types';
import { session } from './session';

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
    env: MOCK_ENV,
} as unknown as Context<AppBindings, string, object>;

const mockNext = vi.fn();

const setup = async (sessionValue: Session | null = null) => {
    const mockGetSession = vi.fn().mockResolvedValue(sessionValue);
    vi.mocked(configureBetterAuth).mockReturnValue({
        api: { getSession: mockGetSession },
    } as unknown as ReturnType<typeof configureBetterAuth>);

    await session(mockContext, mockNext);

    return { mockGetSession };
};

describe('session middleware', () => {
    afterEach(() => {
        vi.resetAllMocks();
    });

    it('sets user and session to null if no session is found', async () => {
        await setup();

        expect(mockContext.set).toHaveBeenCalledWith('session', null);
        expect(mockNext).toHaveBeenCalled();
    });

    it('sets user and session if session is found', async () => {
        await setup(MOCK_SESSION);

        expect(mockContext.set).toHaveBeenCalledWith('session', MOCK_SESSION);
        expect(mockNext).toHaveBeenCalled();
    });

    it('calls getSession with the correct headers', async () => {
        const { mockGetSession } = await setup();

        expect(mockGetSession).toHaveBeenCalledWith({
            headers: mockContext.req.raw.headers,
        });
    });
});
