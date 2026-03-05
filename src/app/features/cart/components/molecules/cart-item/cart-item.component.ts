import { Component, inject, input, output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CartItem } from '../../../interfaces/cart.interface';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cart-item',
  imports: [CurrencyPipe],
  templateUrl: './cart-item.component.html'
})
export class CartItemComponent {
  private cartService = inject(CartService);

  item = input.required<CartItem>();
  cartUpdated = output<void>();

  onDecrease() {
    const current = this.item();
    if (current.quantity === 1) {
      this.cartService.removeItem(current.productId).subscribe({
        next: () => this.cartUpdated.emit()
      });
    } else {
      this.cartService.updateItem(current.productId, current.quantity - 1).subscribe({
        next: () => this.cartUpdated.emit()
      });
    }
  }

  onIncrease() {
    const current = this.item();
    this.cartService.updateItem(current.productId, current.quantity + 1).subscribe({
      next: () => this.cartUpdated.emit()
    });
  }

  onRemove() {
    this.cartService.removeItem(this.item().productId).subscribe({
      next: () => this.cartUpdated.emit()
    });
  }
}
