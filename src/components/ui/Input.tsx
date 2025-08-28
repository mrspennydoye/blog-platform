import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({ label, className, ...props }: InputProps) {
  return (
    <div className="mb-4">
      {label && <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">{label}</label>}
      <input
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`}
        {...props}
      />
    </div>
  );
}