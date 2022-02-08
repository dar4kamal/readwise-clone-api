import {
  Get,
  Body,
  Param,
  Patch,
  UseGuards,
  Controller,
  BadRequestException,
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
    if (Object.keys(updateUserDTO).length === 0)
      throw new BadRequestException('Empty Data Provided');

    return this.userService.updateUserDetails(user, updateUserDTO);
  }
}
