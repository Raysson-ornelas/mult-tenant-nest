import { Test, TestingModule } from '@nestjs/testing';
import { ParkingLotService } from './parking-lot.service';
import { PrismaService } from '../database/prisma.service';
import { REQUEST } from '@nestjs/core';

describe('ParkingLotService', () => {
  let service: ParkingLotService;

  const mockRequest = {
    tenantId: 'tenant1',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ParkingLotService,
        {
          provide: PrismaService,
          useValue: {
            // Mock PrismaService methods if needed
          },
        },
        {
          provide: REQUEST,
          useValue: mockRequest,
        },
      ],
    }).compile();

    service = await module.resolve<ParkingLotService>(ParkingLotService);
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
    expect(parkingLot).toBeNull();
  });

  it('should find all parking lots for a tenant', () => {
    const parkingLots = service.findAll();
    expect(parkingLots.length).toEqual(0);
  });
});
