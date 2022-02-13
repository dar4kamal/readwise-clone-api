import { ApiBadRequestResponse } from '@nestjs/swagger';
import { applyDecorators, HttpStatus } from '@nestjs/common';

import generateDocsErrorExample from './generateDocsErrorExample';

const BadRequestResponse = (message: string, description: string) =>
  applyDecorators(
    ApiBadRequestResponse({
      description,
      schema: generateDocsErrorExample(message, HttpStatus.BAD_REQUEST),
    }),
  );

export default BadRequestResponse;
