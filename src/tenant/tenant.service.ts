import { Injectable, Scope, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { PrismaService } from '../database/prisma.service';

@Injectable({ scope: Scope.REQUEST })
export class TenantService {
  constructor(
    @Inject(REQUEST) private request: any,
    private prisma: PrismaService,
  ) {
    this.validateTenant();
  }

  async validateTenant() {
    const tenantId = this.request.tenantId;
    if (!tenantId) {
      throw new HttpException('X-Tenant-ID header is missing', HttpStatus.BAD_REQUEST);
    }

    const tenant = await this.prisma.tenant.findUnique({
      where: { id: tenantId },
    });

    if (!tenant) {
      throw new HttpException('Tenant not found', HttpStatus.NOT_FOUND);
    }
  }
}
