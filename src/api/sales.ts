import api from './client';
import type { Sale } from '../types';

export interface SaleItemInput {
  product_id: number;
  quantity: number;
}

export interface SaleListResponse {
  data: Sale[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export const listSales = async (params: { per_page?: number; page?: number } = {}): Promise<SaleListResponse> => {
  const { data } = await api.get<SaleListResponse>('/sales', { params });
  return data;
};

export const createSale = async (items: SaleItemInput[]): Promise<Sale> => {
  const { data } = await api.post<Sale>('/sales', { items });
  return data;
};

export const getSale = async (id: number): Promise<Sale> => {
  const { data } = await api.get<Sale>(`/sales/${id}`);
  return data;
};

export const completeSale = async (id: number): Promise<Sale> => {
  const { data } = await api.post<Sale>(`/sales/${id}/complete`);
  return data;
};

export const cancelSale = async (id: number): Promise<Sale> => {
  const { data } = await api.post<Sale>(`/sales/${id}/cancel`);
  return data;
};

export const getCoupon = async (id: number): Promise<{ coupon: string }> => {
  const { data } = await api.get<{ coupon: string }>(`/sales/${id}/coupon`);
  return data;
};
