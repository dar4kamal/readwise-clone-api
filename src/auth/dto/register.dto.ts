import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class RegisterDTO {
  @IsNotEmpty({ message: 'email is required' })
  @IsEmail({ message: 'email Must be a valid' })
  email: string;

  @IsString({ message: 'password Must be a valid string' })
  @IsNotEmpty({ message: 'password is required' })
  password: string;

  @IsString({ message: 'name Must be a valid string' })
  @IsNotEmpty({ message: 'name is required' })
  name: string;
}
