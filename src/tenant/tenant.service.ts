import { Injectable, Scope, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { DatabaseService } from '../database/database.service';

@Injectable({ scope: Scope.REQUEST })
export class TenantService {
  constructor(
    @Inject(REQUEST) private request: any,
    private databaseService: DatabaseService,
  ) {
    const tenantId = this.request.tenantId;
    const tenant = this.databaseService.tenants.find((t) => t.id === tenantId);
    if (!tenant) {
      throw new HttpException('Tenant not found', HttpStatus.NOT_FOUND);
    }
  }
}
