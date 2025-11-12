import { Injectable, OnModuleInit } from '@nestjs/common';
// TODO: Fix the import and type casting
// import { PrismaClient } from '@prisma/client';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class PrismaService /* extends PrismaClient */ implements OnModuleInit {
  constructor(private readonly cls: ClsService) {
    const tenantId = cls.get('tenantId');
    const databaseUrl = process.env[`DATABASE_URL_${tenantId}`];

    // super({
    //   datasources: {
    //     db: {
    //       url: databaseUrl,
    //     },
    //   },
    // });
  }

  async onModuleInit() {
    // TODO: Fix the type casting
    await (this as any).$connect();
  }
}
