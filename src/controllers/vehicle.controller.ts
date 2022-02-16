import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { VehicleService } from '../services/vehicle.service';
import { FirebaseTokenGuard } from '../guards/firebase-token.guard';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { VehicleDTO } from '../dto/vehicle.dto';
import { VehicleOwnerGuard } from '../guards/vehicle-owner.guard';

@Controller('items/vehicles')
@ApiTags('Vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get('')
  @UseGuards(FirebaseTokenGuard)
  @ApiSecurity('Bearer')
  getMe(@Req() request) {
    return this.vehicleService.getAll(request.user);
  }

  @Post('')
  @UseGuards(FirebaseTokenGuard)
  @ApiSecurity('Bearer')
  createVehicle(@Req() request, @Body() body: VehicleDTO) {
    return this.vehicleService.createVehicle(request.user, body);
  }

  @Patch(':vehicleId')
  @UseGuards(FirebaseTokenGuard, VehicleOwnerGuard)
  @ApiSecurity('Bearer')
  updateVehicle(
    @Body() body: VehicleDTO,
    @Param('vehicleId') vehicleId: string,
  ) {
    return this.vehicleService.updateVehicle(vehicleId, body);
  }

  @Delete(':vehicleId')
  @UseGuards(FirebaseTokenGuard, VehicleOwnerGuard)
  @ApiSecurity('Bearer')
  deleteVehicle(@Param('vehicleId') vehicleId: string) {
    return this.vehicleService.deleteVehicle(vehicleId);
  }
}
