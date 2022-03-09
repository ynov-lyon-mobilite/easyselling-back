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
import { EmailDTO } from '../dto/email.dto';

@Controller('vehicles')
@ApiTags('Vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get('')
  @UseGuards(FirebaseTokenGuard)
  @ApiSecurity('Bearer')
  getUserVehicles(@Req() request) {
    return this.vehicleService.getAll(request.user);
  }

  @Get('shared')
  @UseGuards(FirebaseTokenGuard)
  @ApiSecurity('Bearer')
  getSharedVehicles(@Req() request) {
    return this.vehicleService.getSharedVehicles(request.user);
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

  @Post(':vehicleId/share')
  @UseGuards(FirebaseTokenGuard, VehicleOwnerGuard)
  @ApiSecurity('Bearer')
  sendShareInvitation(
    @Body() body: EmailDTO,
    @Param('vehicleId') vehicleId: string,
  ) {
    return this.vehicleService.sendShareInvitation(vehicleId, body.email);
  }

  @Post('authorization/:authorizationId/active')
  @UseGuards(FirebaseTokenGuard)
  @ApiSecurity('Bearer')
  activeShareInvitation(
    @Req() request,
    @Param('authorizationId') authorizationId: string,
  ) {
    return this.vehicleService.activeShareInvitation(
      authorizationId,
      request.user,
    );
  }
}
