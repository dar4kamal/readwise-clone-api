import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class LoginDTO {
  @IsNotEmpty({ message: 'email is required' })
  @IsEmail({ message: 'email Must be a valid' })
  email: string;

  @IsString({ message: 'password Must be a valid string' })
  @IsNotEmpty({ message: 'password is required' })
  password: string;
}
