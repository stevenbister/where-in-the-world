import { and, eq } from 'drizzle-orm';

import { database } from '../../db';
import { trips } from '../../db/schema/trips';
import type { AuthedAppRouteHandler } from '../../types';
import type {
    CreateTripRoute,
    DeleteTripRoute,
    TripByIdRoute,
    TripsRoute,
    UpdateTripRoute,
} from './trips.routes';

export const getTripsHandler: AuthedAppRouteHandler<TripsRoute> = async (c) => {
    const db = database();
    const session = c.get('session');

    const trips = await db.query.trips.findMany({
        where: {
            createdBy: session.user.id,
        },
    });

    return c.json(trips, 200);
};

export const getTripByIdHandler: AuthedAppRouteHandler<TripByIdRoute> = async (
    c
) => {
    const db = database();
    const session = c.get('session');
    const { id } = c.req.valid('param');

    const trip = await db.query.trips.findFirst({
        where: {
            id,
            createdBy: session.user.id,
        },
    });

    if (!trip) {
        return c.json({ error: 'Not Found' }, 404);
    }

    return c.json(trip, 200);
};

export const createTripHandler: AuthedAppRouteHandler<CreateTripRoute> = async (
    c
) => {
    const db = database();
    const session = c.get('session');

    const tripData = c.req.valid('json');
    const now = new Date();

    const newTrip = await db
        .insert(trips)
        .values({
            createdAt: now,
            updatedAt: now,
            createdBy: session.user.id,
            ...tripData,
        })
        .returning();

    return c.json(newTrip, 201);
};

export const updateTripHandler: AuthedAppRouteHandler<UpdateTripRoute> = async (
    c
) => {
    const db = database();
    const session = c.get('session');
    const { id } = c.req.valid('param');

    const tripData = c.req.valid('json');
    const now = new Date();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- we are intentionally ignoring the createdBy field from the request body to prevent it from being updated
    const { createdBy, ...safeTripData } = tripData;

    const updatedTrip = await db
        .update(trips)
        .set({
            updatedAt: now,
            ...safeTripData,
        })
        .where(and(eq(trips.id, id), eq(trips.createdBy, session.user.id)))
        .returning();

    return c.json(updatedTrip, 200);
};

export const deleteTripHandler: AuthedAppRouteHandler<DeleteTripRoute> = async (
    c
) => {
    const db = database();
    const session = c.get('session');

    const tripId = c.req.param('id');

    const deletedTrip = await db
        .delete(trips)
        .where(and(eq(trips.id, tripId), eq(trips.createdBy, session.user.id)))
        .returning();

    if (deletedTrip.length === 0) {
        return c.json({ error: 'Not Found' }, 404);
    }

    return c.json(deletedTrip, 200);
};
