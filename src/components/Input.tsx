import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = ({ label, error, className = '', ...props }: InputProps) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        className={`rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  );
};
