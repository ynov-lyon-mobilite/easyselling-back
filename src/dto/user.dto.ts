import { ApiProperty } from '@nestjs/swagger';
import { EmailDTO } from './email.dto';
// import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDTO extends EmailDTO {
  @ApiProperty()
  // @IsNotEmpty()
  password: string;

  @ApiProperty()
  // @IsNotEmpty()
  firstname: string;

  @ApiProperty()
  // @IsNotEmpty()
  lastname: string;
}
