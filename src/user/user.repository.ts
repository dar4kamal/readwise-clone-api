import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { User } from './user.entity';

import errorWrapper from '../utilities/errorWrapper';
import { UserSearchByType } from '../utilities/types';

import searchableFindUser from './userRepositoryUtils/searchableFindUser';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findByAny(
    searchBy: UserSearchByType,
    searchValue: string,
    onlyCheck?: boolean,
  ): Promise<boolean | User> {
    const user = await errorWrapper<InternalServerErrorException>(
      searchableFindUser,
      [this, searchBy, searchValue],
    );

    if (!user) throw new NotFoundException('user not found');
    return onlyCheck ? !!user : user;
  }

  async saveOne(
    userRepo: Repository<User>,
    newUser: User,
    responseMessage: string,
  ) {
    await userRepo.save(newUser);
    return responseMessage;
  }
}
