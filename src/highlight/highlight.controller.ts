import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Controller,
  NotImplementedException,
} from '@nestjs/common';

import { User } from '../user/user.entity';

import { HighlightService } from './highlight.service';

import AddHighlightDTO from './dto/addHighlight.dto';
import UpdateHighlightDTO from './dto/updateHighlight.dto';

import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { GetUser } from '../utilities/get-user.decorator';

@Controller('highlights')
export class HighlightController {
  constructor(private highlightService: HighlightService) {}

  @Get('all')
  getPublicOnes() {
    console.log('Getting all public ones');
    // return this.highlightService.getPublicOnes();
    throw new NotImplementedException();
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getUserHighlights(@GetUser() user: User) {
    console.log({ user });
    // return this.highlightService.getUserHighlights(user);
    throw new NotImplementedException();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  addNewHighlight(
    @Body() addHighlightDTO: AddHighlightDTO,
    @GetUser() user: User,
  ) {
    console.log({ user, addHighlightDTO });
    // return this.highlightService.addNewHighlight(user, addHighlightDTO);
    throw new NotImplementedException();
  }

  @Patch(':highlightId')
  @UseGuards(JwtAuthGuard)
  updateHighlightDetails(
    @Body() updateHighlightDTO: UpdateHighlightDTO,
    @GetUser() user: User,
  ) {
    console.log({ user, updateHighlightDTO });
    // return this.highlightService.updateHighlightDetails(user, updateHighlightDTO);
    throw new NotImplementedException();
  }

  @Patch('fav/:highlightId')
  @UseGuards(JwtAuthGuard)
  favouriteHighlight(
    @Param('highlightId') highlightId: string,
    @GetUser() user: User,
  ) {
    console.log({ user, highlightId });
    // return this.highlightService.favouriteHighlight(user, highlightId);
    throw new NotImplementedException();
  }

  @Patch('privacy/:highlightId')
  @UseGuards(JwtAuthGuard)
  changeHighlightPrivacy(
    @Param('highlightId') highlightId: string,
    @GetUser() user: User,
  ) {
    console.log({ user, highlightId });
    // return this.highlightService.changeHighlightPrivacy(user, highlightId);
    throw new NotImplementedException();
  }
}
