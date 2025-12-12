import { Test, TestingModule } from '@nestjs/testing';
import { ParkingRecordController } from './parking-record.controller';
import { ParkingRecordService } from './parking-record.service';

describe('ParkingRecordController', () => {
  let controller: ParkingRecordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingRecordController],
      providers: [ParkingRecordService],
    }).compile();

    controller = module.get<ParkingRecordController>(ParkingRecordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
