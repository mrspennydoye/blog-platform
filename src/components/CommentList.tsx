import { Comment, User } from '@/types';
import { useDeleteCommentMutation } from '@/store/api/blogApi';
import { Trash2 } from 'lucide-react';
import Button from './ui/Button';
import Image from 'next/image';

interface CommentListProps {
  comments: Comment[];
  slug: string;
  currentUser: User | null;
}

export default function CommentList({ comments, slug, currentUser }: CommentListProps) {
  const [deleteComment, { isLoading: isDeleting }] = useDeleteCommentMutation();

  const handleDelete = async (id: number) => {
    try {
      await deleteComment({ slug, id }).unwrap();
    } catch (err) {
      console.error('Failed to delete comment:', err);
    }
  };

  return (
    <div className="space-y-4 mt-6">
      {comments.map((comment) => (
        <div key={comment.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border dark:border-gray-700">
          <p className="text-gray-800 dark:text-gray-300">{comment.body}</p>
          <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mt-2 pt-2 border-t dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <Image 
                src={comment.author.image || 'https://static.productionready.io/images/smiley-cyrus.jpg'} 
                alt={comment.author.username} 
                className="w-6 h-6 rounded-full" 
              />
              <span className="text-amber-600 dark:text-amber-400">{comment.author.username}</span>
              <span className="text-gray-400 dark:text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</span>
            </div>
            {/* Show delete button only if the current user is the author of the comment. */}
            {currentUser?.username === comment.author.username && (
              <Button
                variant="outline"
                onClick={() => handleDelete(comment.id)}
                disabled={isDeleting}
                className="p-1 h-auto text-red-500 border-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                aria-label="Delete comment"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
