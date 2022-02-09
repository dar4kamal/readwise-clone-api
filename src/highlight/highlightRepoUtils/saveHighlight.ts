import { Highlight } from '../highlight.entity';
import { HighlightRepository } from '../highlight.repository';

export default async function (
  repository: HighlightRepository,
  highlight: Highlight,
  responseMessage: string,
) {
  await repository.save(highlight);
  return responseMessage;
}
