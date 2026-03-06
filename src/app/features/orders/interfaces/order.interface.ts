export interface CreateOrderRequest {
  address: string;
  phone: string;
}

export interface OrderItem {
  productId: number;
  productName: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
}

export interface Order {
  id: number;
  userId: number;
  items: OrderItem[];
  totalAmount: number;
  address: string;
  phone: string;
  createdAt: string;
}
