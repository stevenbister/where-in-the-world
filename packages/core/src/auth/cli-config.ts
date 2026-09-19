// packages/core/auth/auth.cli-config.ts
// Used ONLY by the better-auth CLI for `generate`/schema introspection.
// Never imported by the actual Worker.
import { createClient } from '@libsql/client';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { drizzle } from 'drizzle-orm/libsql';

import { defaultOptions, plugins } from './server';

const client = createClient({ url: ':memory:' });
const db = drizzle({ client });

const auth = betterAuth({
    database: drizzleAdapter(db, { provider: 'sqlite' }),
    baseURL: 'http://localhost:3000',
    secret: process.env.BETTER_AUTH_SECRET,
    ...defaultOptions,
    plugins,
});

export default auth;
