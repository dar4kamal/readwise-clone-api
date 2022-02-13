import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDTO {
  @IsOptional()
  @IsNotEmpty({ message: 'email is required' })
  @IsEmail({}, { message: 'email Must be a valid email address' })
  @ApiPropertyOptional()
  email: string;

  @IsOptional()
  @IsString({ message: 'name Must be a valid string' })
  @IsNotEmpty({ message: 'name is required' })
  @ApiPropertyOptional()
  name: string;
}
