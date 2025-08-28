'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { toggleTheme } from '@/store/slices/uiSlice';
import { Moon, Sun } from 'lucide-react';
import Button from './Button';

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const { theme } = useSelector((state: RootState) => state.ui);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <Button
      variant="secondary"
      onClick={handleToggle}
      className="p-2 h-10 w-10"
      aria-label="Toggle theme"
    >
      <Sun className="h-15 w-15 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}