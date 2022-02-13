import { HttpStatus } from '@nestjs/common';

export default (result: any | any[], httpStatus: HttpStatus) => {
  return {
    example: { result, statusCode: httpStatus, errors: [] },
  };
};
