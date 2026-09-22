import type { Session } from '../types';

export const MOCK_SESSION: Session = {
    session: {
        id: '4567',
        token: 'adofjasdlfkhasdf',
        userId: '1234',
        ipAddress: null,
        userAgent: null,
        expiresAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    user: {
        id: '1234',
        name: 'Test McGee',
        email: 'test@test.com',
        emailVerified: true,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
};
