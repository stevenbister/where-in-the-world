jest.mock('@scalar/hono-api-reference', () => ({
    Scalar: () => (c: any) => c.text('docs'),
}));
