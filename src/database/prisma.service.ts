import { Injectable, Scope, Inject } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class PrismaService extends PrismaClient {
  constructor(@Inject(REQUEST) private readonly request: any) {
    const tenantId = request.tenantId;
    if (!tenantId) {
      throw new Error('Tenant ID not found in request');
    }

    const databaseUrl = `postgresql://postgres:postgres@db:5432/${tenantId}?schema=public`;

    super({
      datasources: {
        db: {
          url: databaseUrl,
        },
      },
    });
  }
}
