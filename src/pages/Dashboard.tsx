import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <h1 className="text-xl font-bold text-gray-800">EasyStock System</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user?.email}</span>
            <button
              onClick={logout}
              className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              Sair
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl p-6">
        <h2 className="mb-6 text-2xl font-semibold text-gray-800">
          Bem-vindo, {user?.name}
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            to="/products"
            className="rounded-lg bg-white p-6 shadow transition hover:shadow-md"
          >
            <h3 className="text-lg font-medium text-gray-800">Produtos</h3>
            <p className="mt-2 text-sm text-gray-600">
              Gerencie o catálogo e o estoque.
            </p>
          </Link>

          <Link
            to="/sales"
            className="rounded-lg bg-white p-6 shadow transition hover:shadow-md"
          >
            <h3 className="text-lg font-medium text-gray-800">Vendas</h3>
            <p className="mt-2 text-sm text-gray-600">
              Crie e acompanhe vendas.
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
};
