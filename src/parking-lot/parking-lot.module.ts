import { Module } from '@nestjs/common';
import { ParkingLotService } from './parking-lot.service';
import { ParkingLotController } from './parking-lot.controller';
import { PrismaModule } from '../database/prisma.module';
import { ClsModule } from 'nestjs-cls';

@Module({
  imports: [PrismaModule, ClsModule],
  controllers: [ParkingLotController],
  providers: [ParkingLotService],
})
export class ParkingLotModule {}
