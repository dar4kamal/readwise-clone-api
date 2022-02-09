import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  UseGuards,
  Controller,
  BadRequestException,
} from '@nestjs/common';

import { User } from '../user/user.entity';

import { HighlightService } from './highlight.service';

import AddHighlightDTO from './dto/addHighlight.dto';
import UpdateHighlightDTO from './dto/updateHighlight.dto';

import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { GetUser } from '../utilities/get-user.decorator';

import { HighlightChangableProperty } from '../utilities/types';

@Controller('highlights')
export class HighlightController {
  constructor(private highlightService: HighlightService) {}

  @Get('all')
  getPublicOnes() {
    return this.highlightService.getPublicOnes();
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getUserHighlights(
    @GetUser() user: User,
    @Query('isPrivate') isPrivate: boolean,
    @Query('isFavorite') isFavorite: boolean,
  ) {
    return this.highlightService.getUserHighlights(user, {
      isPrivate,
      isFavorite,
    });
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  addNewHighlight(
    @Body() addHighlightDTO: AddHighlightDTO,
    @GetUser() user: User,
  ) {
    return this.highlightService.addNewHighlight(addHighlightDTO, user);
  }

  @Patch(':highlightId')
  @UseGuards(JwtAuthGuard)
  updateHighlightDetails(
    @Param('highlightId') highlightId: string,
    @Body() updateHighlightDTO: UpdateHighlightDTO,
    @GetUser() user: User,
  ) {
    console.log({ updateHighlightDTO });
    if (Object.keys(updateHighlightDTO).length === 0)
      throw new BadRequestException('Empty Data Provided');

    return this.highlightService.updateHighlightDetails(
      highlightId,
      updateHighlightDTO,
      user,
    );
  }

  @Patch('fav/:highlightId')
  @UseGuards(JwtAuthGuard)
  favoriteHighlight(
    @Param('highlightId') highlightId: string,
    @GetUser() user: User,
  ) {
    return this.highlightService.changeHighlightPropertyState(
      highlightId,
      user,
      HighlightChangableProperty.isFavorite,
    );
  }

  @Patch('privacy/:highlightId')
  @UseGuards(JwtAuthGuard)
  changeHighlightPrivacy(
    @Param('highlightId') highlightId: string,
    @GetUser() user: User,
  ) {
    return this.highlightService.changeHighlightPropertyState(
      highlightId,
      user,
      HighlightChangableProperty.isPrivate,
    );
  }
}
