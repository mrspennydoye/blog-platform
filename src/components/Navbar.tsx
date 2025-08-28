'use client';

import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import ThemeToggle from './ui/ThemeToggle';

export default function Navbar() {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-xl font-bold text-primary">
            BlogPlatform
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-primary">
              Home
            </Link>
            {isAuthenticated ? (
              <>
                <Link href="/posts/create" className="text-gray-600 dark:text-gray-300 hover:text-primary">
                  New Post
                </Link>
                <Link href={`/auth/profile`} className="text-gray-600 dark:text-gray-300 hover:text-primary">
                  {user?.username}
                </Link>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="text-gray-600 dark:text-gray-300 hover:text-primary">
                  Sign in
                </Link>
                <Link href="/auth/register" className="text-gray-600 dark:text-gray-300 hover:text-primary">
                  Sign up
                </Link>
              </>
            )}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}