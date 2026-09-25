import { cloudflareTest, readD1Migrations } from '@cloudflare/vitest-plugin';
import { sharedConfig } from '@repo/vitest-config';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    ...sharedConfig,
    test: {
        ...sharedConfig.test,
        setupFiles: ['./vitest-setup.ts'],
    },
    plugins: [
        cloudflareTest(async () => {
            const migrations = await readD1Migrations({
                projectPath: import.meta.dirname,
                migrationsDir: './src/db/migrations',
                migrationsPattern: './src/db/migrations/*/migration.sql',
            });

            return {
                wrangler: {
                    configPath: './wrangler.jsonc',
                },
                miniflare: {
                    bindings: { TEST_MIGRATIONS: migrations },
                },
            };
        }),
    ],
});
