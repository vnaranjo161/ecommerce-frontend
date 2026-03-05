import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductCardComponent } from '../../components/molecules/product-card/product-card.component';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-products',
  imports: [ProductCardComponent],
  templateUrl: './products.component.html'
})
export default class ProductsComponent implements OnInit {
  
  private productsService = inject(ProductsService);

  products = signal<Product[]>([]);
  loading = signal(true);
  errorMessage = signal<string | null>(null);

  ngOnInit() {
    this.productsService.getProducts().subscribe({
      next: (data) => {
        this.products.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err.error?.message ?? 'Error al cargar los productos');
        this.loading.set(false);
      }
    });
  }
}
