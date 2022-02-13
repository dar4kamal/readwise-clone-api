import { HttpStatus } from '@nestjs/common';

export default (result: string | any[], httpStatus: HttpStatus) => {
  return {
    example: { result, statusCode: httpStatus, errors: [] },
  };
};
