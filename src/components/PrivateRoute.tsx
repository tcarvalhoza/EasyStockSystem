import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="text-lg">Carregando...</span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
