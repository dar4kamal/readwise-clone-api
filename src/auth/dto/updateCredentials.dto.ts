import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateCredentialsDto {
  @IsString({ message: 'oldPassword Must be a valid string' })
  @IsNotEmpty({ message: 'oldPassword is required' })
  @ApiProperty({ required: true })
  oldPassword: string;

  @IsString({ message: 'newPassword Must be a valid string' })
  @IsNotEmpty({ message: 'newPassword is required' })
  @ApiProperty({ required: true })
  newPassword: string;

  @IsString({ message: 'confirmPassword Must be a valid string' })
  @IsNotEmpty({ message: 'confirmPassword is required' })
  @ApiProperty({ required: true })
  confirmPassword: string;
}
