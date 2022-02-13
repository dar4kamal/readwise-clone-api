import { ApiBadRequestResponse } from '@nestjs/swagger';
import { applyDecorators, HttpStatus } from '@nestjs/common';

import generateDocsErrorExample from './generateDocsErrorExample';

const AlreadyExistsResponse = (entityName: string) =>
  applyDecorators(
    ApiBadRequestResponse({
      description: `${entityName} already has been added before`,
      schema: generateDocsErrorExample(
        `${entityName} already exists`,
        HttpStatus.BAD_REQUEST,
      ),
    }),
  );

export default AlreadyExistsResponse;
