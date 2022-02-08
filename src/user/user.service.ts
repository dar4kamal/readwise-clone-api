import { BadRequestException, Injectable } from '@nestjs/common';

import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { UpdateUserDTO } from './dto/updateUser.dto';

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

  async updateUserDetails(user: User, updateUserDTO: UpdateUserDTO) {
    const { id } = user;
    const currentUser = (await this.userRepository.findByAny(
      UserSearchByType.id,
      id,
    )) as User;

    const { name, email } = updateUserDTO;

    if (this.userRepository.checkMatchedDetails(currentUser, updateUserDTO))
      throw new BadRequestException(
        'User Details are already matched with the new specified ones',
      );

    name && (currentUser.name = name);
    email && (currentUser.email = email);

    return await this.userRepository.saveOne(
      currentUser,
      'User Details have been updated successfully',
    );
  }
}
