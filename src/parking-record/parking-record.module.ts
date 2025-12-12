import { Module } from '@nestjs/common';
import { ParkingRecordService } from './parking-record.service';
import { ParkingRecordController } from './parking-record.controller';

@Module({
  controllers: [ParkingRecordController],
  providers: [ParkingRecordService],
})
export class ParkingRecordModule {}
