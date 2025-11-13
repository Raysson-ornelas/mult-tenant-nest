import { Controller, Body } from '@nestjs/common';
import { ParkingLotService } from './parking-lot.service';
// import { CreateParkingLotDto } from './dto/create-parking-lot.dto';

@Controller('parking-lot')
export class ParkingLotController {
  constructor(private readonly parkingLotService: ParkingLotService) {}

  // @Post()
  // create(@Body() createParkingLotDto: CreateParkingLotDto) {
  //   return this.parkingLotService.create(createParkingLotDto);
  // }

  // @Get()
  // findAll() {
  //   return this.parkingLotService.findAll();
  // }
}
