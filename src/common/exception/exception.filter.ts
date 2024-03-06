import type {
  ArgumentsHost,
  ExceptionFilter as ExceptionFilterBase,
} from '@nestjs/common';
import { Catch, HttpException, HttpStatus } from '@nestjs/common';
import { getLogger } from 'src/utils/logger';

const logger = getLogger('ExceptionFilter');

class EmptyObject {
  constructor() {}
}

function processMessage(exception: any): string {
  let message: any =
    exception instanceof HttpException
      ? exception.getResponse()
      : 'Internal server error';
  if (typeof message == 'object') {
    message = message.message ? message.message : message.error || message;
  }
  return message;
}

@Catch()
export class ExceptionFilter<T> implements ExceptionFilterBase {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Log data
    logger.error(`Body: ${JSON.stringify(request.body)}`);
    logger.error(`Query: ${JSON.stringify(request.query)}`);
    logger.error(`Params: ${JSON.stringify(request.params)}`);
    logger.error(exception);

    const message = processMessage(exception);

    response.status(status).json({
      meta: {
        code: status,
        message,
      },
      data: new EmptyObject(),
    });
  }
}
