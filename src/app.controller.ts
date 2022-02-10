import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Just a Ping On Server' })
  @ApiOkResponse({ description: 'API working status message' })
  getHello(): string {
    return this.appService.ping();
  }
}
