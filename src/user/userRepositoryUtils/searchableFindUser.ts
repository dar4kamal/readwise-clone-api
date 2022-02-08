import { Repository } from 'typeorm';

import { User } from '../user.entity';

import { UserSearchByType } from '../../utilities/types';

export default async function (
  repository: Repository<User>,
  searchBy: UserSearchByType,
  searchValue: string,
  fullObjectSelection: false,
) {
  const publicProps: Array<keyof User> = ['email', 'id', 'name', 'highlights'];

  return await repository.findOne({
    where: { [searchBy]: searchValue },
    select: fullObjectSelection ? [...publicProps, 'password'] : publicProps,
  });
}
