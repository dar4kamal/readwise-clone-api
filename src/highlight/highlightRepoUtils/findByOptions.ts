import { HighlightRepository } from '../highlight.repository';

export default async function (repository: HighlightRepository, options = {}) {
  return await repository.find({
    where: options,
    relations: ['user'],
  });
}
