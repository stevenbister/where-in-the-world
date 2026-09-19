import { defineRelations } from 'drizzle-orm';

import { account, rateLimit, session, user, verification } from './auth';
import { entries } from './entries';
import { entryHistory } from './entry-history';
import { media } from './media';
import { tripMembers } from './trip-members';
import { trips } from './trips';

export const relations = defineRelations(
    {
        account,
        entries,
        entryHistory,
        media,
        rateLimit,
        session,
        tripMembers,
        trips,
        user,
        verification,
    },
    (r) => ({
        user: {
            sessions: r.many.session({
                from: r.user.id,
                to: r.session.userId,
            }),
            accounts: r.many.account({
                from: r.user.id,
                to: r.account.userId,
            }),
            createdTrips: r.many.trips({ alias: 'tripCreator' }),
            memberships: r.many.tripMembers(),
            trips: r.many.trips({
                from: r.user.id.through(r.tripMembers.userId),
                to: r.trips.id.through(r.tripMembers.tripId),
            }),
            entries: r.many.entries(),
            pickedMedia: r.many.media(),
            entryEdits: r.many.entryHistory(),
        },
        session: {
            user: r.one.user({
                from: r.session.userId,
                to: r.user.id,
                optional: false,
            }),
        },
        account: {
            user: r.one.user({
                from: r.account.userId,
                to: r.user.id,
                optional: false,
            }),
        },
        trips: {
            creator: r.one.user({
                from: r.trips.createdBy,
                to: r.user.id,
                alias: 'tripCreator',
            }),
            coverPhoto: r.one.media({
                from: r.trips.coverPhotoId,
                to: r.media.id,
            }),
            memberships: r.many.tripMembers(),
            members: r.many.user({
                from: r.trips.id.through(r.tripMembers.tripId),
                to: r.user.id.through(r.tripMembers.userId),
            }),
            entries: r.many.entries(),
        },
        tripMembers: {
            trip: r.one.trips({
                from: r.tripMembers.tripId,
                to: r.trips.id,
                optional: false,
            }),
            user: r.one.user({
                from: r.tripMembers.userId,
                to: r.user.id,
                optional: false,
            }),
        },
        entries: {
            trip: r.one.trips({
                from: r.entries.tripId,
                to: r.trips.id,
                optional: false,
            }),
            author: r.one.user({
                from: r.entries.authorId,
                to: r.user.id,
                optional: false,
            }),
            media: r.many.media(),
            history: r.many.entryHistory(),
        },
        media: {
            entry: r.one.entries({
                from: r.media.entryId,
                to: r.entries.id,
                optional: false,
            }),
            pickedBy: r.one.user({
                from: r.media.pickedByUserId,
                to: r.user.id,
                optional: false,
            }),
        },
        entryHistory: {
            entry: r.one.entries({
                from: r.entryHistory.entryId,
                to: r.entries.id,
                optional: false,
            }),
            editor: r.one.user({
                from: r.entryHistory.editedBy,
                to: r.user.id,
                optional: false,
            }),
        },
    })
);
