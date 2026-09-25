import { defineOpenAPIRoute } from '@hono/zod-openapi';

import {
    createTripHandler,
    deleteTripHandler,
    getTripByIdHandler,
    getTripsHandler,
    updateTripHandler,
} from './trips.handlers';
import {
    createTrip,
    deleteTrip,
    getTripById,
    getTrips,
    updateTrip,
} from './trips.routes';

export const tripRoutes = [
    defineOpenAPIRoute({
        route: getTrips,
        handler: getTripsHandler,
    }),
    defineOpenAPIRoute({
        route: getTripById,
        handler: getTripByIdHandler,
    }),
    defineOpenAPIRoute({
        route: createTrip,
        handler: createTripHandler,
    }),
    defineOpenAPIRoute({
        route: updateTrip,
        handler: updateTripHandler,
    }),
    defineOpenAPIRoute({
        route: deleteTrip,
        handler: deleteTripHandler,
    }),
] as const;
