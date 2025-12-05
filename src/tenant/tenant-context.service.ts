import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

@Injectable()
export class TenantContextService {
  private readonly als = new AsyncLocalStorage<string>();

  setTenantId(tenantId: string, callback: () => void) {
    this.als.run(tenantId, callback);
  }

  getTenantId(): string | undefined {
    return this.als.getStore();
  }
}
