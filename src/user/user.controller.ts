import {
  Get,
  Body,
  Param,
  Patch,
  UseGuards,
  Controller,
  BadRequestException,
  NotImplementedException,
} from '@nestjs/common';

import { User } from './user.entity';
import { UpdateUserDTO } from './dto/updateUser.dto';

import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { GetUser } from '../utilities/get-user.decorator';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  getUserDetails(@Param('id') userId: string): Promise<User> {
    return this.userService.getUserDetails(userId);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  updateUserDetails(
    @GetUser() user: User,
    @Body() updateUserDTO: UpdateUserDTO,
  ): Promise<User> {
    if (Object.keys(updateUserDTO))
      throw new BadRequestException('Empty Data Provided');

    console.log({ user, updateUserDTO });
    // return this.userService.updateUserDetails(user, updateUserDTO);
    throw new NotImplementedException();
  }
}
