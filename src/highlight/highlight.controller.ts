import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  UseGuards,
  Controller,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiQuery,
  ApiResponse,
  ApiOperation,
  ApiBasicAuth,
  ApiOkResponse,
} from '@nestjs/swagger';

import { User } from '../user/user.entity';

import { HighlightService } from './highlight.service';

import AddHighlightDTO from './dto/addHighlight.dto';
import UpdateHighlightDTO from './dto/updateHighlight.dto';

import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { GetUser } from '../utilities/get-user.decorator';

import { HighlightChangableProperty } from '../utilities/types';
import generateDocsErrorExample from '../utilities/docs-decorators/generateDocsErrorExample';

import generateDocsExample from '../utilities/docs-decorators/generateDocsExample';
import NotFoundResponse from '../utilities/docs-decorators/notFoundResponse.decorator';
import UnauthorizedResponse from '../utilities/docs-decorators/unauthorizedResponse.decorator';
import InternalServerErrorResponse from '../utilities/docs-decorators/internalServerErrorResponse.decorator';

@Controller('highlights')
@ApiTags('Highlight')
export class HighlightController {
  constructor(private highlightService: HighlightService) {}

  @Get('all')
  @ApiOperation({ summary: 'Get all public highlights' })
  @ApiOkResponse({
    schema: generateDocsExample(
      [
        {
          id: 'uuid',
          src: 'string',
          srcType: 'string',
          srcAuthor: 'string',
          content: 'string',
          createdAt: 'date',
          updatedAt: 'date',
          isFavorite: 'boolean',
          isPrivate: 'boolean',
          likesCount: 'number',
          user: 'object',
        },
      ],
      HttpStatus.OK,
    ),
  })
  @InternalServerErrorResponse()
  getPublicOnes() {
    return this.highlightService.getPublicOnes();
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBasicAuth('x-auth-token')
  @ApiQuery({ name: 'isPrivate', required: false })
  @ApiQuery({ name: 'isFavorite', required: false })
  @ApiOperation({ summary: "Get user's highlights" })
  @ApiOkResponse({
    schema: generateDocsExample(
      [
        {
          id: 'uuid',
          src: 'string',
          srcType: 'string',
          srcAuthor: 'string',
          content: 'string',
          createdAt: 'date',
          updatedAt: 'date',
          isFavorite: 'boolean',
          isPrivate: 'boolean',
          likesCount: 'number',
          user: 'object',
        },
      ],
      HttpStatus.OK,
    ),
  })
  @UnauthorizedResponse()
  @InternalServerErrorResponse()
  getUserHighlights(
    @GetUser() user: User,
    @Query('isPrivate') isPrivate?: boolean,
    @Query('isFavorite') isFavorite?: boolean,
  ) {
    return this.highlightService.getUserHighlights(user, {
      isPrivate,
      isFavorite,
    });
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBasicAuth('x-auth-token')
  @ApiOperation({ summary: 'Add new highlight' })
  @ApiOkResponse({
    schema: generateDocsExample(
      'Your highlight has been saved successfully',
      HttpStatus.OK,
    ),
  })
  @UnauthorizedResponse()
  @InternalServerErrorResponse()
  addNewHighlight(
    @Body() addHighlightDTO: AddHighlightDTO,
    @GetUser() user: User,
  ) {
    return this.highlightService.addNewHighlight(addHighlightDTO, user);
  }

  @Patch(':highlightId')
  @UseGuards(JwtAuthGuard)
  @ApiBasicAuth('x-auth-token')
  @ApiOperation({ summary: "update highlight's details" })
  @ApiOkResponse({
    schema: generateDocsExample(
      'Your highlight has been updated successfully',
      HttpStatus.OK,
    ),
  })
  @ApiResponse({
    schema: generateDocsErrorExample(
      'Empty Data Provided',
      HttpStatus.BAD_REQUEST,
    ),
  })
  @UnauthorizedResponse()
  @NotFoundResponse('Highlight')
  @InternalServerErrorResponse()
  updateHighlightDetails(
    @Param('highlightId') highlightId: string,
    @Body() updateHighlightDTO: UpdateHighlightDTO,
    @GetUser() user: User,
  ) {
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
  @ApiBasicAuth('x-auth-token')
  @ApiOperation({ summary: "update highlight's favorite state" })
  @ApiOkResponse({
    schema: generateDocsExample(
      'Your highlight has been favorited || unfavorited successfully',
      HttpStatus.OK,
    ),
  })
  @UnauthorizedResponse()
  @NotFoundResponse('Highlight')
  @InternalServerErrorResponse()
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
  @ApiBasicAuth('x-auth-token')
  @ApiOperation({ summary: "update highlight's privacy state" })
  @ApiOkResponse({
    schema: generateDocsExample(
      'Your highlight has been set private || public successfully',
      HttpStatus.OK,
    ),
  })
  @UnauthorizedResponse()
  @NotFoundResponse('Highlight')
  @InternalServerErrorResponse()
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
