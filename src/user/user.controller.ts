import {
  Get,
  Body,
  Param,
  Patch,
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

import { User } from './user.entity';
import { UpdateUserDTO } from './dto/updateUser.dto';

import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { GetUser } from '../utilities/get-user.decorator';

import { UserService } from './user.service';

import generateDocsExample from '../utilities/docs-decorators/generateDocsExample';
import NotFoundResponse from '../utilities/docs-decorators/notFoundResponse.decorator';
import BadRequestResponse from '../utilities/docs-decorators/badRequestResponse.decorator';
import UnauthorizedResponse from '../utilities/docs-decorators/unauthorizedResponse.decorator';
import InvalidCredentialsResponse from '../utilities/docs-decorators/invalidCredentialsResponse.decorator';
import InternalServerErrorResponse from '../utilities/docs-decorators/internalServerErrorResponse.decorator';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  @ApiOperation({ summary: "Get user's information" })
  @ApiOkResponse({
    description: 'User information is returned successfully',
    schema: generateDocsExample(
      {
        id: 'uuid',
        email: 'example@email.com',
        name: 'user name',
      },
      HttpStatus.OK,
    ),
  })
  @NotFoundResponse('User')
  @InternalServerErrorResponse()
  getUserDetails(@Param('id') userId: string): Promise<User> {
    return this.userService.getUserDetails(userId);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  @ApiBasicAuth('x-auth-token')
  @ApiOperation({ summary: "Update user's information" })
  @ApiOkResponse({
    description: 'User information is updated successfully',
    schema: generateDocsExample(
      'User Details have been updated successfully',
      HttpStatus.OK,
    ),
  })
  @ApiResponse({
    description: 'Request Body is Empty',
    schema: generateDocsExample('Empty Data Provided', HttpStatus.BAD_REQUEST),
  })
  @BadRequestResponse(
    'User Details are already matched with the new specified ones',
    "Nothing Changed in user's information",
  )
  @UnauthorizedResponse()
  @NotFoundResponse('User')
  @InvalidCredentialsResponse()
  @InternalServerErrorResponse()
  updateUserDetails(
    @GetUser() user: User,
    @Body() updateUserDTO: UpdateUserDTO,
  ): Promise<User> {
    if (Object.keys(updateUserDTO).length === 0)
      throw new BadRequestException('Empty Data Provided');

    return this.userService.updateUserDetails(user, updateUserDTO);
  }
}
