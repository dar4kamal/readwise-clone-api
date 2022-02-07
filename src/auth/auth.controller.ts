import {
  Body,
  Post,
  Controller,
  NotImplementedException,
} from '@nestjs/common';

import { AuthService } from './auth.service';

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
  updatePassword(@Body() updateCredentialsDto: UpdateCredentialsDto) {
    console.log(updateCredentialsDto);
    // return this.authService.register();
    throw new NotImplementedException();
  }
}
