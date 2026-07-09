export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  roles?: { id: number; name: string }[];
}

export interface Product {
  id: number;
  name: string;
  sku: string;
  description?: string;
  price: string;
  stock_quantity: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SaleItem {
  id: number;
  product_id: number;
  quantity: number;
  unit_price: string;
  subtotal: string;
  product: Product;
}

export interface Sale {
  id: number;
  user_id: number;
  coupon_number: string;
  total_amount: string;
  discount_amount: string;
  final_amount: string;
  status: 'pending' | 'completed' | 'cancelled';
  completed_at?: string;
  created_at: string;
  updated_at: string;
  items: SaleItem[];
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  password_confirmation: string;
  role?: string;
}
