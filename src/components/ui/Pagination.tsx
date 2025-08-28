import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center mt-8">
      <nav>
        <ul className="inline-flex items-center -space-x-px">
          {pageNumbers.map((number) => (
            <li key={number}>
              <button
                onClick={() => onPageChange(number)}
                className={`px-3 py-2 leading-tight ${
                  currentPage === number
                    ? 'bg-primary text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                } border border-gray-300 dark:border-gray-700 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white`}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}