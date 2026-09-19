import type { z } from '@hono/zod-openapi';

export const json = <T extends z.ZodObject | z.ZodArray<z.ZodObject>>(
    schema: T,
    description: string
) => {
    return {
        content: {
            'application/json': {
                schema,
            },
        },
        description,
    };
};

export const text = <T extends z.ZodLiteral | z.ZodString>(
    schema: T,
    description: string
) => {
    return {
        content: {
            'text/plain': {
                schema,
            },
        },
        description,
    };
};
