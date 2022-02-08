import { Injectable } from '@nestjs/common';

import { User } from './user.entity';
import { UserRepository } from './user.repository';

import { UserSearchByType } from '../utilities/types';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUserDetails(userId: string): Promise<User> {
    return (await this.userRepository.findByAny(
      UserSearchByType.id,
      userId,
    )) as User;
  }
}
