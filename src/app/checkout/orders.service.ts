import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import type { Pay, Period, PlanId } from '../../shared/plans';

export interface OrderInput { plan: PlanId; period: Period; pay: Pay; name: string; phone: string; email: string }

@Injectable({ providedIn: 'root' })
export class OrdersService {
  private readonly http = inject(HttpClient);
  create(order: OrderInput) {
    return firstValueFrom(this.http.post<{ id: string; totalCents: number }>('/api/orders', order));
  }
}
