import { HighlightRepository } from '../highlight.repository';

export default async function (repository: HighlightRepository) {
  return await repository.find({
    where: { isPrivate: false },
    relations: ['user'],
  });
}
