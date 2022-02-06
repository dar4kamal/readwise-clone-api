import { IsNotEmpty, IsUUID } from 'class-validator';

export class JwtPayloadDTO {
  @IsNotEmpty({ message: `user id is required` })
  @IsUUID(4, { message: 'user id Must be a valid uuid' })
  id: string;
}
