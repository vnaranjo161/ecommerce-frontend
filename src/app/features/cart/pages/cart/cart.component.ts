import { Component, inject, OnInit, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartItemComponent } from '../../components/molecules/cart-item/cart-item.component';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../interfaces/cart.interface';
import { OrderService } from '../../../orders/services/order.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { FormFieldComponent } from '../../../../shared/components/molecules/form-field/form-field.component';
import { ButtonComponent } from '../../../../shared/components/atoms/button/button.component';

@Component({
  selector: 'app-cart',
  imports: [CartItemComponent, CurrencyPipe, RouterLink, ReactiveFormsModule, FormFieldComponent],
  templateUrl: './cart.component.html'
})
export default class CartComponent implements OnInit {

  private cartService = inject(CartService);
  private orderService = inject(OrderService);
  private notificationService = inject(NotificationService);
  private router = inject(Router);

  cart = signal<Cart | null>(null);
  loading = signal(true);
  errorMessage = signal<string | null>(null);
  showCheckoutModal = signal(false);
  checkoutLoading = signal(false);

  checkoutForm = new FormGroup({
    address: new FormControl('', [Validators.required, Validators.minLength(5)]),
    phone: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}$')])
  });

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
        this.errorMessage.set(err.error?.error ?? 'Error al cargar el carrito');
        this.loading.set(false);
      }
    });
  }

  openCheckout() {
    this.checkoutForm.reset();
    this.showCheckoutModal.set(true);
  }

  closeCheckout() {
    this.showCheckoutModal.set(false);
  }

  onCheckoutSubmit() {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    const { address, phone } = this.checkoutForm.value;
    this.checkoutLoading.set(true);

    this.orderService.createOrder({ address: address!, phone: phone! }).subscribe({
      next: () => {
        this.checkoutLoading.set(false);
        this.showCheckoutModal.set(false);
        this.notificationService.success('Orden creada exitosamente');
        this.router.navigate(['/orders']);
      },
      error: (err) => {
        this.checkoutLoading.set(false);
        this.notificationService.error(err.error?.error ?? 'Error al crear la orden');
      }
    });
  }
}
