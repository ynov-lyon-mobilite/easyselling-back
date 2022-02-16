import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from '../services/authentication.service';
import { LoginDTO } from '../dto/login.dto';
import { RefreshDTO } from '../dto/refresh.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('login')
  login(@Body() body: LoginDTO) {
    return this.authenticationService.login(body);
  }

  @Post('refresh')
  refresh(@Body() body: RefreshDTO) {
    return this.authenticationService.refreshToken(body);
  }
}
