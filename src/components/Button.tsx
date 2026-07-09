import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md';
}

const variants = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50',
  danger: 'bg-red-600 text-white hover:bg-red-700',
  success: 'bg-green-600 text-white hover:bg-green-700',
};

const sizes = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-4 py-2',
};

export const Button = ({ variant = 'primary', size = 'md', className = '', ...props }: ButtonProps) => {
  return (
    <button
      className={`rounded-md font-medium transition disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
};
