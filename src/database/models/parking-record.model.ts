export interface ParkingRecord {
  id: string;
  entryTime: Date;
  exitTime?: Date;
  total?: number;
  carId: string;
  parkingLotId: string;
}
