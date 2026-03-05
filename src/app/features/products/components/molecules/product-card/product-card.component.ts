import { Component, inject, input, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../../interfaces/product.interface';
import { CartService } from '../../../../cart/services/cart.service';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe],
  templateUrl: './product-card.component.html'
})
export class ProductCardComponent {
  private cartService = inject(CartService);

  product = input.required<Product>();
  adding = signal(false);

  onAddToCart() {
    this.adding.set(true);
    this.cartService.addItem(this.product().id, 1).subscribe({
      next: () => this.adding.set(false),
      error: () => this.adding.set(false)
    });
  }
}
