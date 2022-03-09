import { ApiProperty } from '@nestjs/swagger';
import { EmailDTO } from './email.dto';
// import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDTO extends EmailDTO {
  @ApiProperty()
  // @IsNotEmpty()
  password: string;
}
