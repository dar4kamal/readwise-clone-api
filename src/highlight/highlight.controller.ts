import { Controller } from '@nestjs/common';

import { HighlightService } from './highlight.service';

@Controller('highlights')
export class HighlightController {
  constructor(private highlightService: HighlightService) {}
}
