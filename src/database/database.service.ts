import { Injectable } from '@nestjs/common';
import { Tenant } from './models/tenant.model';
import { Car } from './models/car.model';
import { ParkingLot } from './models/parking-lot.model';
import { ParkingRecord } from './models/parking-record.model';

@Injectable()
export class DatabaseService {
  public tenants: Tenant[] = [];
  public cars: Car[] = [];
  public parkingLots: ParkingLot[] = [];
  public parkingRecords: ParkingRecord[] = [];
}
