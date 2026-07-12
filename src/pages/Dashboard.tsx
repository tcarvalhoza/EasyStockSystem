import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Header } from '../components/Header';

export const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

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
            <h3 className="text-lg font-medium text-gray-800">Nova Venda</h3>
            <p className="mt-2 text-sm text-gray-600">
              Crie uma nova venda.
            </p>
          </Link>

          <Link
            to="/sales/history"
            className="rounded-lg bg-white p-6 shadow transition hover:shadow-md"
          >
            <h3 className="text-lg font-medium text-gray-800">Histórico de Vendas</h3>
            <p className="mt-2 text-sm text-gray-600">
              Visualize as vendas realizadas.
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
};
