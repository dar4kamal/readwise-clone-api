import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Highlight } from './highlight.entity';

import { HighlightService } from './highlight.service';
import { HighlightController } from './highlight.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Highlight])],
  controllers: [HighlightController],
  providers: [HighlightService],
})
export class HighlightModule {}
