import { useEffect, useState } from 'react';
import { listProducts, createProduct, updateProduct, deleteProduct } from '../api/products';
import type { Product } from '../types';
import { Modal } from '../components/Modal';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Breadcrumb } from '../components/Breadcrumb';
import { Header } from '../components/Header';

const emptyProduct = {
  name: '',
  sku: '',
  description: '',
  price: '',
  stock_quantity: 0,
  is_active: true,
};

export const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formError, setFormError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState(emptyProduct);

  const load = async () => {
    try {
      setLoading(true);
      const response = await listProducts({ per_page: 50 });
      setProducts(response.data);
    } catch (err) {
      setError('Erro ao carregar produtos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setEditingProduct(null);
    setForm(emptyProduct);
    setFormError('');
    setIsModalOpen(true);
  };

  const openEdit = (product: Product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      sku: product.sku,
      description: product.description ?? '',
      price: product.price,
      stock_quantity: product.stock_quantity,
      is_active: product.is_active,
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setForm(emptyProduct);
    setFormError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    const payload = {
      ...form,
      stock_quantity: Number(form.stock_quantity),
    };

    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, payload);
      } else {
        await createProduct(payload as Omit<Product, 'id' | 'created_at' | 'updated_at'>);
      }
      closeModal();
      load();
    } catch (err) {
      setFormError('Erro ao salvar produto. Verifique os campos.');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Deseja remover este produto?')) return;
    try {
      await deleteProduct(id);
      load();
    } catch (err) {
      setError('Erro ao remover produto');
    }
  };

  const updateField = (field: keyof typeof form, value: string | number | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return <div className="p-6">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="mx-auto max-w-7xl p-6">
        <Breadcrumb items={[{ label: 'Início', to: '/' }, { label: 'Produtos' }]} />
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-800">Produtos</h2>
          <Button onClick={openCreate}>Novo Produto</Button>
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
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Nome</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">SKU</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Preço</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Estoque</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Ativo</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-4 py-3 text-sm text-gray-900">{product.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{product.sku}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">R$ {product.price}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{product.stock_quantity}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {product.is_active ? 'Sim' : 'Não'}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex gap-2">
                      <Button variant="secondary" onClick={() => openEdit(product)} size="sm">
                        Editar
                      </Button>
                      <Button variant="danger" onClick={() => handleDelete(product.id)} size="sm">
                        Remover
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={editingProduct ? 'Editar Produto' : 'Novo Produto'}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {formError && (
              <div className="rounded bg-red-100 p-3 text-sm text-red-700">
                {formError}
              </div>
            )}

            <Input
              label="Nome"
              value={form.name}
              onChange={(e) => updateField('name', e.target.value)}
              required
            />

            <Input
              label="SKU"
              value={form.sku}
              onChange={(e) => updateField('sku', e.target.value)}
              required
            />

            <Input
              label="Descrição"
              value={form.description}
              onChange={(e) => updateField('description', e.target.value)}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Preço"
                type="number"
                step="0.01"
                min={0}
                value={form.price}
                onChange={(e) => updateField('price', e.target.value)}
                required
              />

              <Input
                label="Estoque"
                type="number"
                min={0}
                value={form.stock_quantity}
                onChange={(e) => updateField('stock_quantity', Number(e.target.value))}
                required
              />
            </div>

            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={form.is_active}
                onChange={(e) => updateField('is_active', e.target.checked)}
                className="h-4 w-4"
              />
              Ativo
            </label>

            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="secondary" onClick={closeModal}>
                Cancelar
              </Button>
              <Button type="submit">
                {editingProduct ? 'Salvar Alterações' : 'Criar Produto'}
              </Button>
            </div>
          </form>
        </Modal>
      </main>
    </div>
  );
};
