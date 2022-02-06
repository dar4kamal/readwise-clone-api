import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';

import { User } from '../user/user.entity';
import { LoginDTO } from './dto/login.dto';

import { checkPassword } from '../utilities/password.utils';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async findUser(email: string, onlyCheck?: boolean): Promise<boolean | User> {
    const user = await this.userRepo.findOne({ where: { email } });
    return onlyCheck ? !!user : user;
  }

  async login(loginDto: LoginDTO): Promise<string> {
    const { email, password } = loginDto;
    const user = (await this.findUser(email)) as User;

    if (!user || !checkPassword(password, user.password))
      throw new BadRequestException('Invalid Credentials');

    return this.jwtService.sign({ id: user.id });
  }
}
