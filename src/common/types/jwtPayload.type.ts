import { Role } from './user.type';

export interface JwtPayload {
  userId: string;
  role: Role;
}
