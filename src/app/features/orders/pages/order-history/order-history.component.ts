import { Component, inject, OnInit, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Order } from '../../interfaces/order.interface';

@Component({
  selector: 'app-order-history',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './order-history.component.html'
})
export default class OrderHistoryComponent implements OnInit {

  private orderService = inject(OrderService);

  orders = signal<Order[]>([]);
  loading = signal(true);
  errorMessage = signal<string | null>(null);

  ngOnInit() {
    this.orderService.getOrders().subscribe({
      next: (data) => {
        this.orders.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err.error?.error ?? 'Error al cargar las órdenes');
        this.loading.set(false);
      }
    });
  }
}
