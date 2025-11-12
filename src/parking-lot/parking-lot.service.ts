import { Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { DatabaseService } from '../database/database.service';
import { CreateParkingLotDto } from './dto/create-parking-lot.dto';
import { v4 as uuidv4 } from 'uuid';
import { ParkingLot } from 'src/database/models/parking-lot.model';

@Injectable({ scope: Scope.REQUEST })
export class ParkingLotService {
  private readonly tenantId: string;

  constructor(
    @Inject(REQUEST) private request: any,
    private databaseService: DatabaseService,
  ) {
    this.tenantId = this.request.tenantId;
  }

  create(createParkingLotDto: CreateParkingLotDto): ParkingLot {
    const newParkingLot: ParkingLot = {
      id: uuidv4(),
      tenantId: this.tenantId,
      ...createParkingLotDto,
    };
    this.databaseService.parkingLots.push(newParkingLot);
    return newParkingLot;
  }

  findAll(): ParkingLot[] {
    return this.databaseService.parkingLots.filter(
      (pl) => pl.tenantId === this.tenantId,
    );
  }
}
