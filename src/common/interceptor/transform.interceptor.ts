import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import type { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import type { IResponse } from 'src/shared/interfaces/response.interface';
import { getLogger } from 'src/utils/logger';

const logger = getLogger('Response');

function processResponseData(data: any): any {
  return {
    meta: {
      code: data.statusCode,
      message: data.message ? data.message : 'Successful',
      pagination: data.pagination,
    },
    data: data.results ? data.results : data,
  };
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, IResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IResponse<T>> {
    const { statusCode } = context.switchToHttp().getResponse();
    // TODO: Unnecessary
    // if (context.switchToHttp().getRequest().url.indexOf('/api/') >= 0) {
    //   return next.handle().pipe(map((data) => data));
    // }

    return next
      .handle()
      .pipe(
        map(
          (data) => (
            logger.info(`API Response Status Code: ${statusCode}`),
            processResponseData(data)
          ),
        ),
      );
  }
}
