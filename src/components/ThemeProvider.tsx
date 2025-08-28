'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useEffect } from 'react';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useSelector((state: RootState) => state.ui);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  return <>{children}</>;
}