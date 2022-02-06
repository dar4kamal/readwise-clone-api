import {
  Catch,
  HttpException,
  ArgumentsHost,
  ExceptionFilter,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class UniversalExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    if (exception instanceof HttpException) {
      const status = exception.getStatus();

      let errors = [];
      let hasErrors = false;
      const exceptionResponse = exception.getResponse();

      if (
        exceptionResponse instanceof Object &&
        exceptionResponse['message'] instanceof Array
      ) {
        hasErrors = true;
        errors = exceptionResponse['message'].map((e: string) => ({
          message: e,
        }));
      }

      response.status(status).json({
        result: null,
        statusCode: status,
        errors: hasErrors ? errors : [{ message: exception.message }],
      });
    } else
      response.status(500).json({
        result: null,
        statusCode: 500,
        errors: [{ message: exception['message'] }],
      });
  }
}
