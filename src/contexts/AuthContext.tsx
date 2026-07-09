import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { User } from '../types';
import { login as loginApi, logout as logoutApi, me } from '../api/auth';
import type { LoginCredentials } from '../types';

interface AuthContextData {
  user: User | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('easystock_token');
    if (!token) {
      setIsLoading(false);
      return;
    }

    me()
      .then(setUser)
      .catch(() => localStorage.removeItem('easystock_token'))
      .finally(() => setIsLoading(false));
  }, []);

  const login = async (credentials: LoginCredentials) => {
    const { token } = await loginApi(credentials);
    localStorage.setItem('easystock_token', token);
    const currentUser = await me();
    setUser(currentUser);
  };

  const logout = async () => {
    await logoutApi();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
