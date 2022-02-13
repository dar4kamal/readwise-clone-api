import {
  Body,
  Post,
  UseGuards,
  Controller,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiBasicAuth,
  ApiOkResponse,
} from '@nestjs/swagger';

import { User } from '../user/user.entity';

import { AuthService } from './auth.service';

import { JwtAuthGuard } from './guards/auth.guard';
import { GetUser } from '../utilities/get-user.decorator';

import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { UpdateCredentialsDto } from './dto/updateCredentials.dto';

import generateDocsExample from '../utilities/docs-decorators/generateDocsExample';
import NotFoundResponse from '../utilities/docs-decorators/notFoundResponse.decorator';
import UnauthorizedResponse from '../utilities/docs-decorators/unauthorizedResponse.decorator';
import AlreadyExistsResponse from '../utilities/docs-decorators/alreadyExistsResponse.decorator';
import InvalidCredentialsResponse from '../utilities/docs-decorators/invalidCredentialsResponse.decorator';
import InternalServerErrorResponse from '../utilities/docs-decorators/internalServerErrorResponse.decorator';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login users' })
  @ApiOkResponse({
    description: 'User has logged in & a new token has been generated',
    schema: generateDocsExample('Generated JWT Token', HttpStatus.CREATED),
  })
  @NotFoundResponse('User')
  @InvalidCredentialsResponse()
  @InternalServerErrorResponse()
  login(@Body() loginDto: LoginDTO) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register new users' })
  @ApiOkResponse({
    schema: generateDocsExample(
      'You have been registered successfully',
      HttpStatus.CREATED,
    ),
    description: 'User has been registered successfully',
  })
  @AlreadyExistsResponse('User')
  @InternalServerErrorResponse()
  register(@Body() registerDto: RegisterDTO) {
    return this.authService.register(registerDto);
  }

  @Post('credentials')
  @UseGuards(JwtAuthGuard)
  @ApiBasicAuth('x-auth-token')
  @ApiOperation({ summary: "Update user's credentials" })
  @ApiOkResponse({
    schema: generateDocsExample(
      'Credentials have been updated successfully',
      HttpStatus.OK,
    ),
    description: 'Credentials have been updated successfully',
  })
  @ApiResponse({
    schema: generateDocsExample(
      'These Credentials have recently been used, Please try something else.',
      HttpStatus.BAD_REQUEST,
    ),
    description: 'Unchanged credentials from previous ones',
  })
  @UnauthorizedResponse()
  @NotFoundResponse('User')
  @InvalidCredentialsResponse()
  @InternalServerErrorResponse()
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
