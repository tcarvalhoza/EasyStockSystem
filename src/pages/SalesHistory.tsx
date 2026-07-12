import { useEffect, useState } from 'react';
import { listSales } from '../api/sales';
import type { Sale } from '../types';
import { Header } from '../components/Header';
import { Breadcrumb } from '../components/Breadcrumb';
import { Button } from '../components/Button';

const statusLabel: Record<Sale['status'], string> = {
  pending: 'Pendente',
  completed: 'Completada',
  cancelled: 'Cancelada',
};

const statusClass: Record<Sale['status'], string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

export const SalesHistory = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      setLoading(true);
      const response = await listSales({ per_page: 50 });
      setSales(response.data);
    } catch (err) {
      setError('Erro ao carregar vendas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return <div className="p-6">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="mx-auto max-w-7xl p-6">
        <Breadcrumb items={[{ label: 'Início', to: '/' }, { label: 'Histórico de Vendas' }]} />
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-800">Histórico de Vendas</h2>
          <Button onClick={load} variant="secondary">
            Recarregar
          </Button>
        </div>

        {error && (
          <div className="mb-4 rounded bg-red-100 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="overflow-x-auto rounded-lg bg-white shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Total</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Itens</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sales.map((sale) => (
                <tr key={sale.id}>
                  <td className="px-4 py-3 text-sm text-gray-900">#{sale.id}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`rounded px-2 py-1 text-xs font-medium ${statusClass[sale.status]}`}>
                      {statusLabel[sale.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">R$ {sale.total_amount}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {sale.items?.map((item) => (
                      <div key={item.id}>
                        {item.quantity}x {item.product?.name ?? `Produto #${item.product_id}`}
                      </div>
                    )) ?? '-'}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {new Date(sale.created_at).toLocaleString('pt-BR')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {sales.length === 0 && !error && (
          <p className="mt-4 text-gray-600">Nenhuma venda registrada.</p>
        )}
      </main>
    </div>
  );
};
