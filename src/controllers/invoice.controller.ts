import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FirebaseTokenGuard } from '../guards/firebase-token.guard';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { VehicleOwnerGuard } from '../guards/vehicle-owner.guard';
import { InvoiceService } from '../services/invoice.service';
import { InvoiceDTO } from '../dto/invoice.dto';

@Controller('/invoices')
@ApiTags('Invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Get('vehicle/:vehicleId')
  @UseGuards(FirebaseTokenGuard, VehicleOwnerGuard)
  @ApiSecurity('Bearer')
  getMe(@Param('vehicleId') vehicleId: string) {
    return this.invoiceService.getInvoicesForVehicle(vehicleId);
  }

  @Post('vehicle/:vehicleId')
  @UseGuards(FirebaseTokenGuard, VehicleOwnerGuard)
  @ApiSecurity('Bearer')
  createVehicle(
    @Param('vehicleId') vehicleId: string,
    @Body() body: InvoiceDTO,
  ) {
    return this.invoiceService.createInvoiceForVehicle(vehicleId, body);
  }

  @Patch(':invoiceId')
  @UseGuards(FirebaseTokenGuard)
  @ApiSecurity('Bearer')
  updateVehicle(
    @Body() body: InvoiceDTO,
    @Param('invoiceId') invoiceId: string,
  ) {
    return this.invoiceService.updateInvoice(invoiceId, body);
  }

  @Delete(':invoiceId')
  @UseGuards(FirebaseTokenGuard)
  @ApiSecurity('Bearer')
  deleteVehicle(@Param('invoiceId') invoiceId: string) {
    return this.invoiceService.deleteInvoice(invoiceId);
  }
}
