import { Repository } from 'typeorm';

import { User } from '../user.entity';

export default async function (
  userRepo: Repository<User>,
  user: User,
  responseMessage: string,
) {
  await userRepo.save(user);
  return responseMessage;
}
