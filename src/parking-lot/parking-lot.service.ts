import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateParkingLotDto } from './dto/create-parking-lot.dto';
import { v4 as uuidv4 } from 'uuid';
// TODO: Fix the import and type casting
// import { ParkingLot } from '@prisma/client';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class ParkingLotService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cls: ClsService,
  ) {}

  async create(createParkingLotDto: CreateParkingLotDto): Promise<any> {
    const tenantId = this.cls.get('tenantId');
    // TODO: Fix the type casting
    return (this.prisma as any).parkingLot.create({
      data: {
        id: uuidv4(),
        tenantId,
        ...createParkingLotDto,
      },
    });
  }

  async findAll(): Promise<any[]> {
    const tenantId = this.cls.get('tenantId');
    // TODO: Fix the type casting
    return (this.prisma as any).parkingLot.findMany({
      where: {
        tenantId,
      },
    });
  }
}
