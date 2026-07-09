import api from './client';
import type { LoginCredentials, RegisterData, User } from '../types';

export interface AuthResponse {
  token: string;
}

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>('/login', credentials);
  return data;
};

export const register = async (data: RegisterData): Promise<User> => {
  const response = await api.post<User>('/register', data);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post('/logout');
  localStorage.removeItem('easystock_token');
};

export const me = async (): Promise<User> => {
  const { data } = await api.get<User>('/user/me');
  return data;
};
