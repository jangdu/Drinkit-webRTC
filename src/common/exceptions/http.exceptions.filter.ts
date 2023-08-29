import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

type ErrorResponse = {
  statusCode: number;
  message: string;
};

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const error = exception.getResponse() as ErrorResponse;

    response.status(error.statusCode).json({
      status: error.statusCode,
      timestamp: new Date().toLocaleString(),
      path: request.url,
      message: error.message,
    });
  }
}
