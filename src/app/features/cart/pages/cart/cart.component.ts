import { Component, inject, OnInit, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartItemComponent } from '../../components/molecules/cart-item/cart-item.component';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../interfaces/cart.interface';

@Component({
  selector: 'app-cart',
  imports: [CartItemComponent, CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html'
})
export default class CartComponent implements OnInit {
  
  private cartService = inject(CartService);

  cart = signal<Cart | null>(null);
  loading = signal(true);
  errorMessage = signal<string | null>(null);

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.loading.set(true);
    this.cartService.getCart().subscribe({
      next: (data) => {
        this.cart.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err.error?.message ?? 'Error al cargar el carrito');
        this.loading.set(false);
      }
    });
  }
}
