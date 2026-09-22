import type { Context, Next } from 'hono';

import { MOCK_SESSION } from './src/__fixtures__/session';
import type { AppBindings } from './src/types';

vi.mock('./src/middleware/session', () => ({
    session: (c: Context<AppBindings, string, object>, next: Next) => {
        c.set('session', MOCK_SESSION);
        return next();
    },
}));

afterEach(() => {
    vi.resetAllMocks();
});
