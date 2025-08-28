'use client';

import { useState } from 'react';
import { useGetArticlesQuery } from '@/store/api/blogApi';
import PostList from '@/components/PostList';
import Pagination from '@/components/ui/Pagination';
import Loader from '@/components/ui/Loader';

export default function PostsPage() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const offset = (page - 1) * limit;
  const { data, isLoading, error } = useGetArticlesQuery({ limit, offset });

  if (isLoading) return <Loader />;
  if (error) return <div>Error loading posts</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Posts</h1>
      <PostList posts={data?.articles || []} />
      <Pagination
        currentPage={page}
        totalPages={Math.ceil((data?.articlesCount || 0) / limit)}
        onPageChange={setPage}
      />
    </div>
  );
}