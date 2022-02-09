import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { HighlightSrcType } from '../../utilities/types';
import getEnumValues from '../../utilities/getEnumValues';

export default class UpdateHighlightDTO {
  @IsOptional()
  @IsNotEmpty({ message: 'src can Not be empty' })
  @IsString({ message: 'src Must be valid text' })
  src: string;

  @IsOptional()
  @IsNotEmpty({ message: 'srcType can Not be empty' })
  @IsEnum(HighlightSrcType, {
    message: `srcType must be within [${getEnumValues(
      HighlightSrcType,
      'string',
    ).join(' , ')}]`,
  })
  srcType: HighlightSrcType;

  @IsOptional()
  @IsNotEmpty({ message: 'srcAuthor can Not be empty' })
  @IsString({ message: 'srcAuthor Must be valid text' })
  srcAuthor: string;

  @IsOptional()
  @IsNotEmpty({ message: 'content can Not be empty' })
  @IsString({ message: 'content Must be valid text' })
  content: string;
}
