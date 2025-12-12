import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import type { Request, Response } from 'express';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const now = Date.now();
    const req = context.switchToHttp().getRequest<Request>();
    const method = req?.method;
    const url = req?.url;
    const ip = req?.ip;

    this.logger.log(`Incoming Request: ${method} ${url} ${ip}`);

    return next.handle().pipe(
      tap({
        next: (data) => {
          const res = context.switchToHttp().getResponse<Response>();
          const statusCode = res.statusCode;
          this.logger.log(
            `Outgoing Response: ${method} ${url} ${ip} - Status: ${statusCode} - ${Date.now() - now}ms - Response data: ${JSON.stringify(data)}`,
          );
        },
      }),
    );
  }
}
