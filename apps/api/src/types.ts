import type { RouteConfig, RouteHandler } from '@hono/zod-openapi';
import type { drizzle as drizzleD1 } from 'drizzle-orm/d1';

import type { auth } from '@repo/core/auth/server';

export type DrizzleD1 = ReturnType<typeof drizzleD1>;

export type Auth = ReturnType<typeof auth>;
export type Session = Auth['$Infer']['Session'];

export type AppBindings = {
    Bindings: CloudflareBindings;
    Variables: {
        db: DrizzleD1;
        session: Session | null;
    };
};

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
    R,
    AppBindings
>;
