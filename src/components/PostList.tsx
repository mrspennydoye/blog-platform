import PostCard from './PostCard';
import { Article } from '@/types';

interface PostListProps {
  posts: Article[];
}

export default function PostList({ posts }: PostListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}