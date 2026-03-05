export interface CartItem {
  productId: number;
  productName: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
}

export interface Cart {
  userId: number;
  items: CartItem[];
  total: number;
}
