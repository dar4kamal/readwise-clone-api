import { ApiUnauthorizedResponse } from '@nestjs/swagger';
import { applyDecorators, HttpStatus } from '@nestjs/common';

import generateDocsErrorExample from './generateDocsErrorExample';

const UnauthorizedResponse = () =>
  applyDecorators(
    ApiUnauthorizedResponse({
      description: 'unauthorized access',
      schema: generateDocsErrorExample('Unauthorized', HttpStatus.UNAUTHORIZED),
    }),
  );

export default UnauthorizedResponse;
