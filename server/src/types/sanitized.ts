import { User } from '@prisma/client';

export type SanitizedUser = Omit<User, 'createdAt' | 'updatedAt' | 'password'>;
