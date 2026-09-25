import { env } from 'cloudflare:workers';
import { drizzle } from 'drizzle-orm/d1';

import { MOCK_SESSION } from '../../__fixtures__/session';
import { trips } from '../../db/schema/trips';
import app from '../../index';

vi.mock('../../lib/configure-better-auth');

const headers = new Headers({
    accept: 'application/json',
    'Content-Type': 'application/json',
});

const mockTrips = [
    {
        id: '1',
        title: 'Japan 2026',
        startDate: new Date('2026-04-01'),
        endDate: new Date('2026-04-15'),
        coverPhotoId: null,
        createdBy: MOCK_SESSION.user.id,
    },
    {
        id: '2',
        title: 'Korea 2026',
        startDate: new Date('2026-04-01'),
        endDate: new Date('2026-04-15'),
        coverPhotoId: null,
        createdBy: MOCK_SESSION.user.id,
    },
];

describe('Trips', () => {
    beforeEach(async () => {
        const db = drizzle(env.DB);
        await db.insert(trips).values(mockTrips);
    });

    afterEach(async () => {
        const db = drizzle(env.DB);
        await db.delete(trips);
    });

    describe('GET /trips', () => {
        it('returns a list of trips', async () => {
            const response = await app.request('/api/v1/trips', {}, env);
            expect(response.status).toBe(200);

            const body = await response.json();
            expect(body).toHaveLength(2);
        });
    });

    describe('GET /trips/{id}', () => {
        it('returns a single trip by ID', async () => {
            const response = await app.request('/api/v1/trips/1', {}, env);
            expect(response.status).toBe(200);

            const body = await response.json();
            expect(body).toHaveProperty('id', '1');
        });
    });

    describe('POST /trips', () => {
        it('creates a new trip', async () => {
            const newTrip: typeof trips.$inferInsert = {
                title: 'Thailand 2026',
                startDate: new Date('2026-04-01'),
                endDate: new Date('2026-04-15'),
                coverPhotoId: null,
            };

            const response = await app.request(
                '/api/v1/trips',
                {
                    method: 'POST',
                    body: JSON.stringify(newTrip),
                    headers,
                },
                env
            );
            expect(response.status).toBe(201);

            const [body] =
                (await response.json()) as (typeof trips.$inferSelect)[];
            expect(body).toHaveProperty('title', newTrip.title);
        });
    });

    describe('PUT /trips/{id}', () => {
        it('updates a trip', async () => {
            const updatedTrip: Partial<typeof trips.$inferInsert> = {
                title: 'Updated Title',
            };

            const response = await app.request(
                '/api/v1/trips/1',
                {
                    method: 'PUT',
                    body: JSON.stringify(updatedTrip),
                    headers,
                },
                env
            );
            expect(response.status).toBe(200);

            const [body] =
                (await response.json()) as (typeof trips.$inferSelect)[];
            expect(body).toHaveProperty('title', updatedTrip.title);
        });
    });

    describe('DELETE /trips/{id}', () => {
        it('deletes a trip', async () => {
            const response = await app.request(
                '/api/v1/trips/1',
                {
                    method: 'DELETE',
                    headers,
                },
                env
            );
            expect(response.status).toBe(200);

            const body = await response.json();
            expect(body).toHaveLength(1);
        });
    });
});
