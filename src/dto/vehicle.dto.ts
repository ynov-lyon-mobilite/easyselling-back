import { ApiProperty } from '@nestjs/swagger';
import { VehicleType } from '../models/vehicle.model';

export class VehicleDTO {
  @ApiProperty()
  // @IsNotEmpty()
  brand: string;

  @ApiProperty()
  model: string;

  @ApiProperty()
  licence: string;

  @ApiProperty()
  type: VehicleType;

  @ApiProperty()
  year: string;
}
