import { Test, TestingModule } from '@nestjs/testing';
import { ParkingRecordService } from './parking-record.service';

describe('ParkingRecordService', () => {
  let service: ParkingRecordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParkingRecordService],
    }).compile();

    service = module.get<ParkingRecordService>(ParkingRecordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
