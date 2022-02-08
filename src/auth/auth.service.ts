import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

import { Repository } from 'typeorm';

import { User } from '../user/user.entity';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { UpdateCredentialsDto } from './dto/updateCredentials.dto';

import errorWrapper from '../utilities/errorWrapper';
import { checkPassword, hashPassword } from '../utilities/password.utils';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  private async findOne(
    userRepo: Repository<User>,
    email: string,
    onlyCheck?: boolean,
  ) {
    const user = await userRepo.findOne({ where: { email } });
    return onlyCheck ? !!user : user;
  }

  private async saveOne(
    userRepo: Repository<User>,
    newUser: User,
    responseMessage: string,
  ) {
    await userRepo.save(newUser);
    return responseMessage;
  }

  async findUser(email: string, onlyCheck?: boolean): Promise<boolean | User> {
    return await errorWrapper<InternalServerErrorException>(this.findOne, [
      this.userRepo,
      email,
      onlyCheck,
    ]);
  }

  async login(loginDto: LoginDTO): Promise<string> {
    const { email, password } = loginDto;
    const user = (await this.findUser(email)) as User;

    if (!user || !checkPassword(password, user.password))
      throw new BadRequestException('Invalid Credentials');

    return this.jwtService.sign({ id: user.id });
  }

  async register(registerDto: RegisterDTO) {
    const { email, name, password } = registerDto;
    const checkUserExists = await this.findUser(email, true);

    if (checkUserExists) throw new BadRequestException('User already exists');

    const newUser = this.userRepo.create({
      email,
      name,
      password: hashPassword(password),
    });

    return await errorWrapper<InternalServerErrorException>(this.saveOne, [
      this.userRepo,
      newUser,
      'You have been registered successfully',
    ]);
  }

  async updatePassword(updateCredentialsDto: UpdateCredentialsDto, user: User) {
    const { oldPassword, newPassword } = updateCredentialsDto;

    const currentUser = (await this.findUser(user.email)) as User;
    if (!currentUser) throw new BadRequestException('User already exists');

    if (!checkPassword(oldPassword, user.password))
      throw new BadRequestException('Invalid Credentials');

    currentUser.password = hashPassword(newPassword);
    return await errorWrapper<InternalServerErrorException>(this.saveOne, [
      this.userRepo,
      currentUser,
      'Credentials have been updated successfully',
    ]);
  }
}
