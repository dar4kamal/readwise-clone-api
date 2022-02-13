import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiInternalServerErrorResponse } from '@nestjs/swagger';

import generateDocsErrorExample from './generateDocsErrorExample';

const InternalServerErrorResponse = () =>
  applyDecorators(
    ApiInternalServerErrorResponse({
      schema: generateDocsErrorExample(
        'The servers have gone offline, Please Try again later.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      ),
      description: 'server have gone offline for some reason',
    }),
  );

export default InternalServerErrorResponse;
