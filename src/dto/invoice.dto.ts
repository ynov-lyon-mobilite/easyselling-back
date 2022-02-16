import { ApiProperty } from '@nestjs/swagger';

export class InvoiceDTO {
  @ApiProperty()
  // @IsNotEmpty()
  // @IsEmail()
  file: string;
}
