import { useEffect, useState } from 'react';
import { listProducts } from '../api/products';
import { createSale, completeSale, cancelSale, getSale } from '../api/sales';
import type { Product, Sale } from '../types';
import { Button } from '../components/Button';

interface CartItem {
  product: Product;
  quantity: number;
}

export const Sales = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<number | ''>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [createdSale, setCreatedSale] = useState<Sale | null>(null);

  useEffect(() => {
    listProducts({ per_page: 100 })
      .then((response) => setProducts(response.data))
      .catch(() => setError('Erro ao carregar produtos'));
  }, []);

  const selectedProduct = products.find((p) => p.id === Number(selectedProductId));

  const addItem = () => {
    if (!selectedProduct || quantity <= 0) return;

    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === selectedProduct.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === selectedProduct.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product: selectedProduct, quantity }];
    });

    setSelectedProductId('');
    setQuantity(1);
  };

  const removeItem = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const total = cart.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0
  );

  const handleCreateSale = async () => {
    if (cart.length === 0) {
      setError('Adicione pelo menos um item ao carrinho');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const sale = await createSale(
        cart.map((item) => ({
          product_id: item.product.id,
          quantity: item.quantity,
        }))
      );
      setCreatedSale(sale);
      setSuccess(`Venda #${sale.id} criada. Total: R$ ${sale.total_amount}`);
      setCart([]);
    } catch (err) {
      setError('Erro ao criar venda. Verifique o estoque.');
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async () => {
    if (!createdSale) return;
    try {
      const sale = await completeSale(createdSale.id);
      setCreatedSale(sale);
      setSuccess(`Venda #${sale.id} completada.`);
    } catch (err) {
      setError('Erro ao completar venda.');
    }
  };

  const handleCancel = async () => {
    if (!createdSale) return;
    try {
      const sale = await cancelSale(createdSale.id);
      setCreatedSale(sale);
      setSuccess(`Venda #${sale.id} cancelada.`);
    } catch (err) {
      setError('Erro ao cancelar venda.');
    }
  };

  const handleReloadSale = async () => {
    if (!createdSale) return;
    try {
      const sale = await getSale(createdSale.id);
      setCreatedSale(sale);
    } catch (err) {
      setError('Erro ao recarregar venda.');
    }
  };

  return (
    <div className="p-6">
      <h2 className="mb-6 text-2xl font-semibold text-gray-800">Nova Venda</h2>

      {error && (
        <div className="mb-4 rounded bg-red-100 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 rounded bg-green-100 p-3 text-sm text-green-700">
          {success}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="mb-4 text-lg font-medium text-gray-800">Adicionar Item</h3>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="mb-1 block text-sm font-medium text-gray-700">Produto</label>
              <select
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(Number(e.target.value) || '')}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              >
                <option value="">Selecione um produto</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name} (Estoque: {product.stock_quantity}) — R$ {product.price}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-28">
              <label className="mb-1 block text-sm font-medium text-gray-700">Qtd</label>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <Button
            type="button"
            onClick={addItem}
            disabled={!selectedProduct || quantity <= 0}
            className="mt-4"
          >
            Adicionar ao Carrinho
          </Button>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="mb-4 text-lg font-medium text-gray-800">Carrinho</h3>

          {cart.length === 0 ? (
            <p className="text-gray-500">Nenhum item adicionado.</p>
          ) : (
            <>
              <ul className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <li key={item.product.id} className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium text-gray-900">{item.product.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.quantity} x R$ {item.product.price}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-medium text-gray-900">
                        R$ {(Number(item.product.price) * item.quantity).toFixed(2)}
                      </span>
                      <Button
                        type="button"
                        variant="danger"
                        size="sm"
                        onClick={() => removeItem(item.product.id)}
                      >
                        Remover
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
                <span className="text-lg font-semibold text-gray-800">Total</span>
                <span className="text-xl font-bold text-blue-600">
                  R$ {total.toFixed(2)}
                </span>
              </div>

              <Button
                type="button"
                variant="success"
                onClick={handleCreateSale}
                disabled={loading}
                className="mt-6 w-full"
              >
                {loading ? 'Criando...' : 'Finalizar Venda'}
              </Button>
            </>
          )}
        </div>
      </div>

      {createdSale && (
        <div className="mt-6 rounded-lg bg-white p-6 shadow">
          <h3 className="mb-4 text-lg font-medium text-gray-800">
            Venda #{createdSale.id}
          </h3>
          <p className="text-sm text-gray-600">
            Status: <span className="font-medium">{createdSale.status}</span>
          </p>
          <p className="text-sm text-gray-600">
            Total: <span className="font-medium">R$ {createdSale.total_amount}</span>
          </p>

          <div className="mt-4 flex gap-3">
            {createdSale.status === 'pending' && (
              <>
                <Button type="button" onClick={handleComplete}>
                  Completar
                </Button>
                <Button type="button" variant="danger" onClick={handleCancel}>
                  Cancelar
                </Button>
              </>
            )}
            <Button type="button" variant="secondary" onClick={handleReloadSale}>
              Recarregar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
