import { HighlightRepository } from '../highlight.repository';

export default async function (
  repository: HighlightRepository,
  options = {},
  findOne = false,
) {
  const highlights = await repository.find({
    where: options,
    relations: ['user'],
  });

  return findOne ? highlights[0] : highlights;
}
