import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateParkingRecordDto } from './dto/create-parking-record.dto';
import { UpdateParkingRecordDto } from './dto/update-parking-record.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ParkingRecordService {
  @Inject()
  private readonly prisma: PrismaService;

  async create(
    createParkingRecordDto: CreateParkingRecordDto & { tenantId?: string },
  ) {
    const entryTime = new Date();

    return await this.prisma.parkingRecord.create({
      data: { ...createParkingRecordDto, entryTime },
    });
  }

  async findAll(tenantId?: string) {
    return await this.prisma.parkingRecord.findMany({
      where: { tenantId },
    });
  }

  async findOne(id: string, tenantId?: string) {
    const record = await this.prisma.parkingRecord.findFirst({
      where: { id, tenantId },
    });

    if (!record) {
      throw new NotFoundException(
        `Registro de estacionamento ID ${id} não encontrado.`,
      );
    }

    return record;
  }

  async update(
    id: string,
    updateParkingRecordDto: UpdateParkingRecordDto,
    tenantId?: string,
  ) {
    const existingRecord = await this.prisma.parkingRecord.findFirst({
      where: { id, tenantId },
    });

    if (!existingRecord) {
      throw new NotFoundException(
        `Registro de estacionamento ID ${id} não encontrado para atualização.`,
      );
    }

    if (existingRecord.exitTime) {
      throw new Error(
        'Não é possível atualizar um registro que já possui hora de saída.',
      );
    }

    return await this.prisma.parkingRecord.update({
      where: { id, tenantId },
      data: updateParkingRecordDto,
    });
  }

  async registerExit(recordId: string, tenantId: string) {
    const record = (await this.prisma.parkingRecord.findUnique({
      where: { id: recordId, tenantId },
      include: {
        parkingLot: true,
      },
    })) as Prisma.ParkingRecordGetPayload<{
      include: { parkingLot: true };
    }> | null;

    if (!record || !record.parkingLot) {
      throw new NotFoundException(
        `Registro de estacionamento ID ${recordId} não encontrado.`,
      );
    }

    if (record.exitTime) {
      throw new Error('Este registro já possui hora de saída registrada.');
    }

    const exitTime = new Date();
    const entryTime = record.entryTime;
    const lot = record.parkingLot;

    const durationMs = exitTime.getTime() - entryTime.getTime();
    const totalMinutes = Math.ceil(durationMs / (1000 * 60));

    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);

    const totalCost = parseFloat(
      (hours * lot.pricePerHour + minutes * lot.pricePerMinute).toFixed(2),
    );

    return this.prisma.parkingRecord.update({
      where: { id: recordId },
      data: {
        exitTime: exitTime,
        total: totalCost,
      },
    });
  }

  async remove(id: string, tenantId?: string) {
    const existingRecord = await this.prisma.parkingRecord.findFirst({
      where: { id, tenantId },
    });

    if (!existingRecord) {
      throw new NotFoundException(
        `Registro de estacionamento ID ${id} não encontrado para remoção.`,
      );
    }

    return await this.prisma.parkingRecord.delete({
      where: { id, tenantId },
    });
  }
}
