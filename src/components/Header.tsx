import { useAuth } from '../contexts/AuthContext';

export const Header = () => {
  const { user, logout } = useAuth();

  return (
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
  );
};
