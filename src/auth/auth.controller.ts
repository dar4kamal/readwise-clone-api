import {
  Body,
  Post,
  UseGuards,
  Controller,
  BadRequestException,
} from '@nestjs/common';

import { User } from '../user/user.entity';

import { AuthService } from './auth.service';

import { JwtAuthGuard } from './guards/auth.guard';
import { GetUser } from '../utilities/get-user.decorator';

import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { UpdateCredentialsDto } from './dto/updateCredentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDTO) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  register(@Body() registerDto: RegisterDTO) {
    return this.authService.register(registerDto);
  }

  @Post('credentials')
  @UseGuards(JwtAuthGuard)
  updatePassword(
    @Body() updateCredentialsDto: UpdateCredentialsDto,
    @GetUser() user: User,
  ) {
    const { oldPassword, newPassword, confirmPassword } = updateCredentialsDto;
    if (newPassword !== confirmPassword)
      throw new BadRequestException('Invalid Credentials');

    if (oldPassword === newPassword)
      throw new BadRequestException(
        'These Credentials have recently been used, Please try something else.',
      );
    return this.authService.updatePassword(updateCredentialsDto, user);
  }
}
