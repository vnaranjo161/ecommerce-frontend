import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Cart } from '../interfaces/cart.interface';

@Injectable({ providedIn: 'root' })
export class CartService {
  
  private http = inject(HttpClient);

  getCart() {
    return this.http.get<Cart>(`${environment.apiUrl}/cart`);
  }

  addItem(productId: number, quantity: number) {
    return this.http.post<Cart>(`${environment.apiUrl}/cart/items`, { productId, quantity });
  }

  updateItem(productId: number, quantity: number) {
    return this.http.put<Cart>(`${environment.apiUrl}/cart/items/${productId}`, { quantity });
  }

  removeItem(productId: number) {
    return this.http.delete<Cart>(`${environment.apiUrl}/cart/items/${productId}`);
  }
}
