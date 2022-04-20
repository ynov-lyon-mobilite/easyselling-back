import { ApiProperty } from '@nestjs/swagger';

export class InvoiceDTO {
  @ApiProperty()
  label?: string;

  @ApiProperty()
  mileage: number;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  file: string;
}
