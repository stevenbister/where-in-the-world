import type { RouteConfig, RouteHandler } from '@hono/zod-openapi';
import type { drizzle as drizzleD1 } from 'drizzle-orm/d1';

export type DrizzleD1 = ReturnType<typeof drizzleD1>;

export type AppBindings = {
    Bindings: CloudflareBindings;
    Variables: {
        db: DrizzleD1;
    };
};

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
    R,
    AppBindings
>;
