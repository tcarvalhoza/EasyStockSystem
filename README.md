# EasyStock System

SPA em **React + TypeScript + Vite** para consumir a API do **EasyStock** (Laravel 12 + Sanctum).

- Repositório: [https://github.com/tcarvalhoza/EasyStockSystem](https://github.com/tcarvalhoza/EasyStockSystem)

## Pré-requisitos

- Node.js 18+ (recomendado 20 LTS)
- npm ou yarn
- Projeto backend **EasyStock** rodando em `http://localhost:8000`

## Passo a passo

### 1. Inicie o backend EasyStock

Antes de subir o frontend, certifique-se de que a API do EasyStock já está em execução:

```bash
cd ~/projeto/EasyStock
php artisan serve
```

A API deve estar disponível em `http://localhost:8000`.

### 2. Acesse a pasta do projeto

```bash
cd ~/projeto/EasyStockSystem
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Configure o CORS no backend (Laravel)

No projeto EasyStock, edite o `.env` para permitir a origem do frontend em desenvolvimento:

```env
FRONTEND_URL=http://localhost:5173
```

Ou configure `config/cors.php` para permitir `*` em dev:

```php
'allowed_origins' => [env('FRONTEND_URL', '*')],
```

### 5. Inicie o frontend

```bash
npm run dev
```

O Vite irá subir o app em `http://localhost:5173` e já redirecionar requisições `/api` para o backend.

### 6. Subir o servidor

Certifique-se de que o processo do Vite está em execução para o frontend ficar acessível no navegador:

```bash
npm run dev
```

Acesse o app em `http://localhost:5173`.

### 7. Login

Use as credenciais de um usuário cadastrado no backend:

- E-mail: `admin@example.com`
- Senha: `password`

> O backend deve ter rodado as migrations e seeders (`php artisan migrate --seed`).

## Estrutura

```
EasyStockSystem/
├── src/
│   ├── api/           # Cliente Axios e funções de API
│   ├── components/    # Componentes reutilizáveis
│   ├── contexts/      # AuthContext (login/logout/usuário)
│   ├── pages/         # Login, Dashboard, Products, Sales, SalesHistory
│   ├── types/         # Interfaces TypeScript
│   ├── App.tsx        # Rotas
│   ├── main.tsx       # Entry point
│   └── index.css      # Tailwind
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── vite.config.ts
```

## Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Gera build de produção |
| `npm run preview` | Visualiza build de produção |
| `npm run lint` | Executa ESLint |

## Rotas da SPA

| Rota | Descrição |
|---|---|
| `/login` | Tela de login |
| `/` | Dashboard |
| `/products` | Listagem e gestão de produtos |
| `/sales` | Criação de vendas |
| `/sales/history` | Histórico de vendas |
