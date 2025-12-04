import { User } from '@prisma/client';
import { Request } from 'express';

export type AuthenticatedUser = {
  id: string;
  email: string;
  role: string;
  tenantId?: string | null;
};

export type RequestWithUser = Request & {
  user: AuthenticatedUser;
};
