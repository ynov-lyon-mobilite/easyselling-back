import { ApiProperty } from '@nestjs/swagger';
// import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDTO {
  @ApiProperty()
  // @IsNotEmpty()
  // @IsEmail()
  email: string;

  @ApiProperty()
  // @IsNotEmpty()
  password: string;
}
