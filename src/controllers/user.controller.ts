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
import { UserDto } from '../dto/user.dto';
import { FirebaseTokenGuard } from '../guards/firebase-token.guard';

@Controller('users')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('')
  createUser(@Body() body: UserDto) {
    return this.userService.registerUser(body);
  }

  @Get('me')
  @UseGuards(FirebaseTokenGuard)
  @ApiSecurity('Bearer')
  getMe(@Req() request) {
    return request.user;
  }

  @Patch(':userId')
  updateUser(@Body() body: UserDto, @Param('userId') userId: string) {
    return this.userService.updateUser(userId, body);
  }
}
