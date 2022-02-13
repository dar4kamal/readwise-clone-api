import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { HighlightSrcType } from '../../utilities/types';
import getEnumValues from '../../utilities/getEnumValues';

export default class AddHighlightDTO {
  @IsNotEmpty({ message: 'src can Not be empty' })
  @IsString({ message: 'src Must be valid text' })
  @ApiProperty({ required: true })
  src: string;

  @IsNotEmpty({ message: 'srcType can Not be empty' })
  @IsEnum(HighlightSrcType, {
    message: `srcType must be within [${getEnumValues(
      HighlightSrcType,
      'string',
    ).join(' , ')}]`,
  })
  @ApiProperty({ required: true, enum: HighlightSrcType })
  srcType: HighlightSrcType;

  @IsNotEmpty({ message: 'srcAuthor can Not be empty' })
  @IsString({ message: 'srcAuthor Must be valid text' })
  @ApiProperty({ required: true })
  srcAuthor: string;

  @IsNotEmpty({ message: 'content can Not be empty' })
  @IsString({ message: 'content Must be valid text' })
  @ApiProperty({ required: true })
  content: string;
}
