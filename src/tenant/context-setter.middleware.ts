import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TenantContextService } from './tenant-context.service';

@Injectable()
export class ContextSetterMiddleware implements NestMiddleware {
  constructor(private readonly tenantContextService: TenantContextService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const tenantId = req['tenantId'];

    if (tenantId) {
      this.tenantContextService.setTenantId(tenantId, next);
    } else {
      next();
    }
  }
}
