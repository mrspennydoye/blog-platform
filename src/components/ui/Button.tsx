import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
}

export default function Button({ children, className, variant = 'primary', ...props }: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-colors duration-200 ease-in-out disabled:opacity-50 disabled:pointer-events-none";
  

  const variantClasses = {
    primary: 'bg-amber-500 text-white hover:bg-amber-600 focus:ring-amber-500 dark:bg-amber-400 dark:text-amber-950 dark:hover:bg-amber-500 dark:focus:ring-amber-300',
    secondary: 'bg-amber-100 text-amber-900 hover:bg-amber-200 focus:ring-amber-300 dark:bg-amber-700 dark:text-amber-100 dark:hover:bg-amber-600 dark:focus:ring-amber-800',
    outline: 'border border-amber-500 text-amber-600 hover:bg-amber-50 hover:text-amber-700 focus:ring-amber-500 dark:border-amber-400 dark:text-amber-400 dark:hover:bg-amber-400 dark:hover:text-amber-950 focus:ring-amber-300'
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
