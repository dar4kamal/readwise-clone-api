import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HighlightService } from './highlight.service';
import { HighlightController } from './highlight.controller';

import { HighlightRepository } from './highlight.repository';

@Module({
  imports: [TypeOrmModule.forFeature([HighlightRepository])],
  controllers: [HighlightController],
  providers: [HighlightService],
})
export class HighlightModule {}
