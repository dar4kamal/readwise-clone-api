import { JwtService } from '@nestjs/jwt';
import { Injectable, BadRequestException } from '@nestjs/common';

import { User } from '../user/user.entity';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { UpdateCredentialsDto } from './dto/updateCredentials.dto';

import { UserRepository } from '../user/user.repository';

import { UserSearchByType } from '../utilities/types';

import { checkPassword, hashPassword } from '../utilities/password.utils';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepository,
  ) {}

  async login(loginDto: LoginDTO): Promise<string> {
    const { email, password } = loginDto;

    const user = (await this.userRepository.findByAny(
      UserSearchByType.email,
      email,
      false,
      true,
    )) as User;

    if (!user || !checkPassword(password, user.password))
      throw new BadRequestException('Invalid Credentials');

    return this.jwtService.sign({ id: user.id });
  }

  async register(registerDto: RegisterDTO) {
    const { email, name, password } = registerDto;

    const checkUserExists = await this.userRepository.findByAny(
      UserSearchByType.email,
      email,
      true,
    );

    if (checkUserExists) throw new BadRequestException('User already exists');

    const newUser = this.userRepository.create({
      email,
      name,
      password: hashPassword(password),
    });

    return await this.userRepository.saveOne(
      newUser,
      'You have been registered successfully',
    );
  }

  async updatePassword(updateCredentialsDto: UpdateCredentialsDto, user: User) {
    const { oldPassword, newPassword } = updateCredentialsDto;

    const currentUser = (await this.userRepository.findByAny(
      UserSearchByType.email,
      user.email,
    )) as User;

    if (!checkPassword(oldPassword, user.password))
      throw new BadRequestException('Invalid Credentials');

    currentUser.password = hashPassword(newPassword);

    return await this.userRepository.saveOne(
      currentUser,
      'Credentials have been updated successfully',
    );
  }
}
