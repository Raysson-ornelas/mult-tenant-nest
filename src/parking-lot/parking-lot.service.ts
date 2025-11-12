import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateParkingLotDto } from './dto/create-parking-lot.dto';
import { UpdateParkingLotDto } from './dto/update-parking-lot.dto';

@Injectable()
export class ParkingLotService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createParkingLotDto: CreateParkingLotDto) {
    return this.prisma.parkingLot.create({
      data: createParkingLotDto,
    });
  }

  async findAll() {
    return this.prisma.parkingLot.findMany();
  }

  async findOne(id: string) {
    return this.prisma.parkingLot.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateParkingLotDto: UpdateParkingLotDto) {
    return this.prisma.parkingLot.update({
      where: { id },
      data: updateParkingLotDto,
    });
  }

  async remove(id: string) {
    return this.prisma.parkingLot.delete({
      where: { id },
    });
  }
}
