import { Test, TestingModule } from '@nestjs/testing';
import { ParkingLotService } from './parking-lot.service';
import { PrismaService } from '../database/prisma.service';
import { ClsService } from 'nestjs-cls';

describe.skip('ParkingLotService', () => {
  let service: ParkingLotService;
  let prismaService: any;
  let clsService: ClsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ParkingLotService,
        {
          provide: PrismaService,
          useValue: {
            parkingLot: {
              create: jest.fn(),
              findMany: jest.fn(),
            },
          },
        },
        {
          provide: ClsService,
          useValue: {
            get: jest.fn().mockReturnValue('tenant1'),
          },
        },
      ],
    }).compile();

    service = module.get<ParkingLotService>(ParkingLotService);
    prismaService = module.get<PrismaService>(PrismaService);
    clsService = module.get<ClsService>(ClsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a parking lot', async () => {
    const createParkingLotDto = {
      name: 'Test Parking Lot',
      pricePerHour: 10,
      pricePerMinute: 0.5,
    };
    const expectedParkingLot = {
      id: expect.any(String),
      tenantId: 'tenant1',
      ...createParkingLotDto,
    };
    (prismaService.parkingLot.create as jest.Mock).mockResolvedValue(
      expectedParkingLot,
    );

    const parkingLot = await service.create(createParkingLotDto);
    expect(parkingLot).toEqual(expectedParkingLot);
    expect(prismaService.parkingLot.create).toHaveBeenCalledWith({
      data: {
        id: expect.any(String),
        tenantId: 'tenant1',
        ...createParkingLotDto,
      },
    });
  });

  it('should find all parking lots for a tenant', async () => {
    const expectedParkingLots = [
      {
        id: '1',
        name: 'Test Parking Lot',
        tenantId: 'tenant1',
        pricePerHour: 10,
        pricePerMinute: 0.5,
      },
    ];
    (prismaService.parkingLot.findMany as jest.Mock).mockResolvedValue(
      expectedParkingLots,
    );

    const parkingLots = await service.findAll();
    expect(parkingLots).toEqual(expectedParkingLots);
    expect(prismaService.parkingLot.findMany).toHaveBeenCalledWith({
      where: {
        tenantId: 'tenant1',
      },
    });
  });
});
