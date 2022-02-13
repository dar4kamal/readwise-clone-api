import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class LoginDTO {
  @IsNotEmpty({ message: 'email is required' })
  @IsEmail({ message: 'email Must be a valid' })
  @ApiProperty({ required: true })
  email: string;

  @IsString({ message: 'password Must be a valid string' })
  @IsNotEmpty({ message: 'password is required' })
  @ApiProperty({ required: true })
  password: string;
}
