import { env } from 'cloudflare:workers';

import { configureBetterAuth } from './configure-better-auth';
import { createApp } from './create-app';

vi.mock('./configure-better-auth', () => ({
    configureBetterAuth: vi.fn(),
}));

describe('createApp', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('creates the app with the correct base path', () => {
        const app = createApp();
        expect(app.routes.every((r) => r.basePath === '/api/v1')).toBe(true);
    });

    it('creates returns a 404 status code when a route is not found', async () => {
        const app = createApp();
        const response = await app.request('/non-existent-route', {}, env);
        expect(response.status).toBe(404);
        expect(await response.json()).toEqual({ error: 'Not Found' });
    });

    it('creates the app with the auth routes', async () => {
        const mockHandler = vi.fn(
            async () => new Response('ok', { status: 200 })
        );

        vi.mocked(configureBetterAuth).mockReturnValue({
            handler: mockHandler,
        } as unknown as ReturnType<typeof configureBetterAuth>);

        const app = createApp();

        const response = await app.request('/api/v1/auth/ok', {}, env);
        expect(response.status).toBe(200);
    });
});
