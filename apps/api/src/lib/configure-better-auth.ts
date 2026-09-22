import { auth } from '@repo/core/auth/server';

import { database } from '../db';
import * as schema from '../db/schema';

export const configureBetterAuth = () => {
    const db = database();
    return auth(db, schema, {
        basePath: '/api/v1/auth',
        baseURL: process.env.BETTER_AUTH_URL,
        secret: process.env.BETTER_AUTH_SECRET,
    });
};
