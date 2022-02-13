import { ApiNotFoundResponse } from '@nestjs/swagger';
import { applyDecorators, HttpStatus } from '@nestjs/common';

import generateDocsErrorExample from './generateDocsErrorExample';

const NotFoundResponse = (entityName: string) =>
  applyDecorators(
    ApiNotFoundResponse({
      description: `${entityName} hasn't been added yet`,
      schema: generateDocsErrorExample(
        `${entityName} not found`,
        HttpStatus.NOT_FOUND,
      ),
    }),
  );

export default NotFoundResponse;
