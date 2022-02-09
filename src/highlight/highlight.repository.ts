import { InternalServerErrorException } from '@nestjs/common';

import { EntityRepository, Repository } from 'typeorm';

import { Highlight } from './highlight.entity';

import errorWrapper from '../utilities/errorWrapper';

import findPublic from './highlightRepoUtils/findPublic';
import saveHighlight from './highlightRepoUtils/saveHighlight';

@EntityRepository(Highlight)
export class HighlightRepository extends Repository<Highlight> {
  async saveOne(highlight: Highlight, responseMessage: string) {
    return await errorWrapper<InternalServerErrorException>(saveHighlight, [
      this,
      highlight,
      responseMessage,
    ]);
  }

  async findPublicOnes() {
    return await errorWrapper<InternalServerErrorException>(findPublic, [this]);
  }
}
