import { adminClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

// Setting return type like this to fix type-error
export type AuthClient = ReturnType<typeof createAuthClient>;

export const authClient: AuthClient = createAuthClient({
    plugins: [adminClient()],
});
