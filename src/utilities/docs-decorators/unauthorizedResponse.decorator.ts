import { ApiUnauthorizedResponse } from '@nestjs/swagger';
import { applyDecorators, HttpStatus } from '@nestjs/common';

import generateDocsErrorExample from './generateDocsErrorExample';

const UnauthorizedResponse = () =>
  applyDecorators(
    ApiUnauthorizedResponse({
      description: 'user has used invalid credentials',
      schema: generateDocsErrorExample(
        'Invalid Credentials',
        HttpStatus.BAD_REQUEST,
      ),
    }),
  );

export default UnauthorizedResponse;
