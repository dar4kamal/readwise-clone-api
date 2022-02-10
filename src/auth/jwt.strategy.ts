import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { User } from '../user/user.entity';
import { JwtPayloadDTO } from './dto/jwt.payload.dto';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepo: UserRepository) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromHeader('x-auth-token'),
    });
  }

  async validate(payload: JwtPayloadDTO): Promise<User> {
    const { id } = payload;

    const user = await this.userRepo.findOne(id);

    if (!user) throw new UnauthorizedException();
    return user;
  }
}
