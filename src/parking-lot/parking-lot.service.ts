import { Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { PrismaService } from '../database/prisma.service';
// import { CreateParkingLotDto } from './dto/create-parking-lot.dto';
// import { v4 as uuidv4 } from 'uuid';
import { RequestWithTenant } from 'src/common/types/request-with-tenant.type';
// import { ParkingLot } from 'src/database/models/parking-lot.model';

@Injectable({ scope: Scope.REQUEST })
export class ParkingLotService {
  private readonly tenantId: string;

  constructor(
    @Inject(REQUEST) private request: RequestWithTenant,
    private prisma: PrismaService,
  ) {
    this.tenantId = this.request.tenantId;
  }

  // create(createParkingLotDto: CreateParkingLotDto): any {
  //   // const newParkingLot: ParkingLot = {
  //   //   id: uuidv4(),
  //   //   tenantId: this.tenantId,
  //   //   ...createParkingLotDto,
  //   // };
  //   // this.databaseService.parkingLots.push(newParkingLot);
  //   // return newParkingLot;
  //   return null;
  // }

  findAll(): any[] {
    // return this.databaseService.parkingLots.filter(
    //   (pl) => pl.tenantId === this.tenantId,
    // );
    return [];
  }
}
