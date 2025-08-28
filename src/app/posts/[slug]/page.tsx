'use client';

import { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useGetArticleQuery, useGetCommentsQuery } from '@/store/api/blogApi';
import CommentList from '@/components/CommentList';
import CommentForm from '@/components/CommentForm';
import Loader from '@/components/ui/Loader';
import Button from '@/components/ui/Button';
import { Heart, UserPlus } from 'lucide-react';

export default function PostDetails({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;

  const { isAuthenticated, user: currentUser } = useSelector((state: RootState) => state.auth);

  const { data: articleData, isLoading: articleLoading, error: articleError } = useGetArticleQuery(slug);
  const { data: commentsData, isLoading: commentsLoading, error: commentsError } = useGetCommentsQuery(slug);

  if (articleLoading || commentsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (articleError || !articleData) {
    return <div className="text-center text-red-500 py-10">Post not found.</div>;
  }

  const { article } = articleData;

  return (
    <main>
      <div className="bg-white dark:bg-gray-800/50 border-b dark:border-gray-700/50">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              {(article.tagList || []).map((tag) => (
                <span key={tag} className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 px-3 py-1 rounded-full text-xs font-medium">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">{article.title}</h1>
            <div className="flex items-center space-x-4">
              <Image 
                className="w-12 h-12 rounded-full" 
                src={article.author.image || 'https://static.productionready.io/images/smiley-cyrus.jpg'} 
                alt={article.author.username} 
              />
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-200">{article.author.username}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(article.createdAt).toDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <article className="prose dark:prose-invert lg:prose-xl max-w-none text-lg text-gray-700 dark:text-gray-300">
            {article.body}
          </article>
          
          <div className="mt-12 py-6 border-t border-b dark:border-gray-700 flex items-center space-x-4">
            <Button variant="outline">
              <UserPlus className="w-4 h-4 mr-2" />
              {article.author.following ? 'Unfollow' : 'Follow'} {article.author.username}
            </Button>
            <Button variant="outline">
              <Heart className="w-4 h-4 mr-2" />
              Favorite Post ({article.favoritesCount})
            </Button>
          </div>

          <div className="mt-16">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Comments</h2>
              {/* Conditionally render the comment form if the user is authenticated. */}
              {isAuthenticated ? (
                <CommentForm slug={slug} />
              ) : (
                <p className="text-center text-gray-600 dark:text-gray-400 p-4 border rounded-lg dark:border-gray-700">
                  <Link href="/auth/login" className="text-amber-600 hover:underline font-semibold">Sign in</Link> or <Link href="/auth/register" className="text-amber-600 hover:underline font-semibold">sign up</Link> to add comments on this article.
                </p>
              )}
              {commentsError ? (
                <p className="text-red-500">Could not load comments.</p>
              ) : (
                <CommentList comments={commentsData?.comments || []} slug={slug} currentUser={currentUser} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
