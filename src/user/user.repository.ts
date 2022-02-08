import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { User } from './user.entity';

import errorWrapper from '../utilities/errorWrapper';
import { UserSearchByType } from '../utilities/types';

import saveUser from './userRepositoryUtils/saveUser';
import searchableFindUser from './userRepositoryUtils/searchableFindUser';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findByAny(
    searchBy: UserSearchByType,
    searchValue: string,
    onlyCheck?: boolean,
    fullObjectSelection?: boolean,
  ): Promise<boolean | User> {
    const user = await errorWrapper<InternalServerErrorException>(
      searchableFindUser,
      [this, searchBy, searchValue, fullObjectSelection],
    );

    if (!user && !onlyCheck) throw new NotFoundException('user not found');
    return onlyCheck ? !!user : user;
  }

  async saveOne(user: User, responseMessage: string) {
    return await errorWrapper<InternalServerErrorException>(saveUser, [
      this,
      user,
      responseMessage,
    ]);
  }

  checkMatchedDetails(user: User, userDetails: Partial<User>): boolean {
    if (
      (userDetails?.email && user.email !== userDetails?.email) ||
      (userDetails?.name && user.name !== userDetails?.name)
    )
      return false;
    return true;
  }
}
