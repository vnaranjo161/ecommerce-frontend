import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Product } from '../interfaces/product.interface';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  
  private http = inject(HttpClient);

  getProducts() {
    return this.http.get<Product[]>(`${environment.apiUrl}/products`);
  }
}
