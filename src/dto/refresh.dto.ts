import { ApiProperty } from '@nestjs/swagger';
// import { IsEmail, IsNotEmpty } from 'class-validator';

export class RefreshDTO {
  @ApiProperty()
  // @IsNotEmpty()
  // @IsEmail()
  refresh_token: string;
}
