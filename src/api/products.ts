import api from './client';
import type { Product } from '../types';

export interface ProductFilters {
  name?: string;
  is_active?: boolean | 1 | 0;
  per_page?: number;
  page?: number;
}

export interface ProductListResponse {
  data: Product[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export const listProducts = async (filters: ProductFilters = {}): Promise<ProductListResponse> => {
  const { data } = await api.get<ProductListResponse>('/products', { params: filters });
  return data;
};

export const getProduct = async (id: number): Promise<Product> => {
  const { data } = await api.get<Product>(`/products/${id}`);
  return data;
};

export const createProduct = async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> => {
  const { data } = await api.post<Product>('/products', product);
  return data;
};

export const updateProduct = async (id: number, product: Partial<Product>): Promise<Product> => {
  const { data } = await api.put<Product>(`/products/${id}`, product);
  return data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await api.delete(`/products/${id}`);
};

export const updateStock = async (id: number, quantity: number): Promise<void> => {
  await api.post(`/products/${id}/stock`, { quantity });
};
