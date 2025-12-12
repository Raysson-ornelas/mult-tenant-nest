import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ParkingRecordService } from './parking-record.service';
import { CreateParkingRecordDto } from './dto/create-parking-record.dto';
import { UpdateParkingRecordDto } from './dto/update-parking-record.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ParkingRecord } from '@prisma/client';
import { RequestWithUser } from 'src/common/types/request-with-user.type';

@UseGuards(AuthGuard)
@Controller('parking-record')
export class ParkingRecordController {
  constructor(private readonly parkingRecordService: ParkingRecordService) {}

  @Post()
  create(
    @Body() createParkingRecordDto: CreateParkingRecordDto,
    @Req() req: RequestWithUser,
  ) {
    return this.parkingRecordService.create({
      ...createParkingRecordDto,
      tenantId: req.user.tenantId,
    });
  }

  @Get()
  findAll(@Req() req: RequestWithUser): Promise<ParkingRecord[]> {
    return this.parkingRecordService.findAll(req.user.tenantId);
  }

  @Get('id')
  findOne(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.parkingRecordService.findOne(id, req.user.tenantId);
  }

  @Patch('id')
  update(
    @Param('id') id: string,
    @Body() updateParkingRecordDto: UpdateParkingRecordDto,
  ) {
    return this.parkingRecordService.update(id, updateParkingRecordDto);
  }

  @Patch('id/checkout')
  updateExitTime(
    @Param('id') id: string,
    @Body() updateParkingRecordDto: UpdateParkingRecordDto,
  ) {
    return this.parkingRecordService.update(id, updateParkingRecordDto);
  }

  @Delete('id')
  remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.parkingRecordService.remove(id, req.user.tenantId);
  }
}
