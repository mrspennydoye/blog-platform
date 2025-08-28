import Link from 'next/link';
import { Article } from '@/types';

interface PostCardProps {
  post: Article;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <Link href={`/posts/${post.slug}`}>
        <h3 className="text-xl font-semibold">{post.title}</h3>
      </Link>
      <p className="text-gray-600 dark:text-gray-400">{post.description}</p>
      <div className="flex flex-wrap mt-2">
        {post.tagList.map((tag) => (
          <span key={tag} className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded mr-2">
            {tag}
          </span>
        ))}
      </div>
      <p className="text-sm text-gray-500 mt-2">By {post.author.username}</p>
    </div>
  );
}