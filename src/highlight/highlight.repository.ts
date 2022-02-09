import { InternalServerErrorException } from '@nestjs/common';

import { EntityRepository, Repository } from 'typeorm';

import { Highlight } from './highlight.entity';

import errorWrapper from '../utilities/errorWrapper';

import saveHighlight from './highlightRepoUtils/saveHighlight';
import findByOptions from './highlightRepoUtils/findByOptions';

@EntityRepository(Highlight)
export class HighlightRepository extends Repository<Highlight> {
  async saveOne(highlight: Highlight, responseMessage: string) {
    return await errorWrapper<InternalServerErrorException>(saveHighlight, [
      this,
      highlight,
      responseMessage,
    ]);
  }

  async findByOptions(options = {}, findOne?: boolean) {
    return await errorWrapper<InternalServerErrorException>(findByOptions, [
      this,
      options,
      findOne,
    ]);
  }
}
