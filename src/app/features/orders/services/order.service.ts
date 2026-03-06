import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CreateOrderRequest, Order } from '../interfaces/order.interface';

@Injectable({ providedIn: 'root' })
export class OrderService {

  private http = inject(HttpClient);

  createOrder(request: CreateOrderRequest) {
    return this.http.post<Order>(`${environment.apiUrl}/orders`, request);
  }

  getOrders() {
    return this.http.get<Order[]>(`${environment.apiUrl}/orders`);
  }
}
