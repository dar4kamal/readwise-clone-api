import { HttpStatus } from '@nestjs/common';

export default (message: string, httpStatus: HttpStatus) => {
  return {
    example: {
      result: null,
      statusCode: httpStatus,
      errors: [{ message }],
    },
  };
};
