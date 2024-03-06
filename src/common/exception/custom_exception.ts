import { HttpException } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor(message: string, statusCode: number, ...data: any) {
    const response = {
      meta: {
        code: statusCode,
      },
      errors: {
        message: message,
      },
      data: data[0],
    };
    super(response, statusCode);
  }
}
