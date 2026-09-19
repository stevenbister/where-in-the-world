import {
    type BetterAuthOptions,
    type BetterAuthPlugin,
    betterAuth,
} from 'better-auth';
import type { DB } from 'better-auth/adapters/drizzle';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { admin } from 'better-auth/plugins/admin';

type Options = Omit<BetterAuthOptions, 'plugins'>;

export const plugins: BetterAuthPlugin[] = [admin()];

export const defaultOptions: Options = {
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60,
        },
    },
    emailAndPassword: {
        enabled: true,
    },
    rateLimit: {
        storage: 'database',
        modelName: 'rateLimit',
    },
    advanced: {
        crossSubDomainCookies: {
            enabled: true,
        },
    },
};

export const auth = (db: DB, options?: Options) => {
    if (!db) throw new Error('DB is required');

    return betterAuth({
        database: drizzleAdapter(db, {
            provider: 'sqlite',
        }),
        ...defaultOptions,
        ...options,
        plugins,
    });
};
