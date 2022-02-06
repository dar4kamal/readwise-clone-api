import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateCredentialsDto {
  @IsString({ message: 'oldPassword Must be a valid string' })
  @IsNotEmpty({ message: 'oldPassword is required' })
  oldPassword: string;

  @IsString({ message: 'newPassword Must be a valid string' })
  @IsNotEmpty({ message: 'newPassword is required' })
  newPassword: string;

  @IsString({ message: 'confirmPassword Must be a valid string' })
  @IsNotEmpty({ message: 'confirmPassword is required' })
  confirmPassword: string;
}
