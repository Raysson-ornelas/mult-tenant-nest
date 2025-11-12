import { Test, TestingModule } from '@nestjs/testing';
import { ParkingLotService } from './parking-lot.service';
import { DatabaseService } from '../database/database.service';
import { REQUEST } from '@nestjs/core';

describe('ParkingLotService', () => {
  let service: ParkingLotService;
  let databaseService: DatabaseService;

  const mockRequest = {
    tenantId: 'tenant1',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ParkingLotService,
        DatabaseService,
        {
          provide: REQUEST,
          useValue: mockRequest,
        },
      ],
    }).compile();

    service = await module.resolve<ParkingLotService>(ParkingLotService);
    databaseService = module.get<DatabaseService>(DatabaseService);
    databaseService.parkingLots = [];
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a parking lot', () => {
    const createParkingLotDto = {
      name: 'Test Parking Lot',
      pricePerHour: 10,
      pricePerMinute: 0.5,
    };
    const parkingLot = service.create(createParkingLotDto);
    expect(parkingLot).toBeDefined();
    expect(parkingLot.name).toEqual(createParkingLotDto.name);
    expect(databaseService.parkingLots.length).toEqual(1);
  });

  it('should find all parking lots for a tenant', () => {
    databaseService.parkingLots.push({
      id: '1',
      name: 'Test Parking Lot',
      tenantId: 'tenant1',
      pricePerHour: 10,
      pricePerMinute: 0.5,
    });
    const parkingLots = service.findAll();
    expect(parkingLots.length).toEqual(1);
  });
});
