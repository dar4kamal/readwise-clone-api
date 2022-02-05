import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Highlight } from './highlight.entity';

@Injectable()
export class HighlightService {
  constructor(
    @InjectRepository(Highlight)
    private highlightsRepository: Repository<Highlight>,
  ) {}
}
