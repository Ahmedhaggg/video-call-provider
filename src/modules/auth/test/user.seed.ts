import { faker } from '@faker-js/faker/.';
import { GoogleUserInfo } from '../types/googleAuthUser.type';
import { User } from '@module/users/entities/user.entity';
import * as crypto from 'crypto';
import { RefreshToken } from '../entities/refreshToken.entity';

export const seedUserData = (): Omit<User, 'id'> => ({
  email: faker.internet.email(),
  isDeleted: false,
  role: 'HOST',
  photo: faker.image.url(),
  lastLogin: null,
  createdAt: new Date(),
  name: faker.internet.displayName(),
});

export const seedGoogleUserInfo = (): GoogleUserInfo => ({
  email: faker.internet.email(),
  name: faker.internet.displayName(),
  firstName: faker.string.alpha({ length: 6 }),
  lastName: faker.string.alpha({ length: 6 }),
  picture: faker.image.url(),
});

export const seedRefreshTokenData = (
  userId: string,
  token: string,
): Omit<RefreshToken, 'id'> => ({
  userId,
  token: crypto.createHash('sha256').update(token).digest('hex'),
  expiresAt: new Date(Date.now() + 100000),
  isRevoked: false,
  createdAt: new Date(),
});
