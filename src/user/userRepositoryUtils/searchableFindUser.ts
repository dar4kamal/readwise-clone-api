import { Repository } from 'typeorm';

import { User } from '../user.entity';

import { UserSearchByType } from '../../utilities/types';

export default async function (
  repository: Repository<User>,
  searchBy: UserSearchByType,
  searchValue: string,
) {
  return await repository.findOne({
    where: { [searchBy]: searchValue },
    select: ['email', 'id', 'name', 'highlights'],
  });
}
