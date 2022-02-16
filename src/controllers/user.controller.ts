import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { UserDTO } from '../dto/user.dto';
import { FirebaseTokenGuard } from '../guards/firebase-token.guard';
import { CurrentUserGuard } from '../guards/current-user.guard';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('')
  createUser(@Body() body: UserDTO) {
    return this.userService.registerUser(body);
  }

  @Get('me')
  @UseGuards(FirebaseTokenGuard)
  @ApiSecurity('Bearer')
  getMe(@Req() request) {
    return request.user;
  }

  @Patch(':userId')
  @UseGuards(FirebaseTokenGuard, CurrentUserGuard)
  @ApiSecurity('Bearer')
  updateUser(@Body() body: UserDTO, @Param('userId') userId: string) {
    return this.userService.updateUser(userId, body);
  }
}
