import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './database/prisma.module';
import { ParkingLotModule } from './parking-lot/parking-lot.module';
import { ClsModule } from 'nestjs-cls';

@Module({
  imports: [
    PrismaModule,
    ParkingLotModule,
    ClsModule.forRoot({
      middleware: {
        mount: true,
        setup: (cls, req) => {
          cls.set('tenantId', req.headers['x-tenant-id']);
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
