import { Module } from '@nestjs/common';
import { ParkingLotService } from './parking-lot.service';
import { ParkingLotController } from './parking-lot.controller';
import { PrismaModule } from '../database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ParkingLotController],
  providers: [ParkingLotService],
})
export class ParkingLotModule {}
