'use client';

import { useState } from 'react';
import { useAddCommentMutation } from '@/store/api/blogApi';
import Button from './ui/Button';

interface CommentFormProps {
  slug: string;
}

export default function CommentForm({ slug }: CommentFormProps) {
  const [body, setBody] = useState('');
  const [addComment, { isLoading }] = useAddCommentMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!body.trim()) return; 
    try {
      await addComment({ slug, body }).unwrap();
      setBody('');
    } catch (err) {
      console.error('Failed to post comment:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 border rounded-lg dark:border-gray-700">
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="block w-full p-4 bg-transparent border-0 rounded-t-lg focus:ring-0 dark:text-gray-300 placeholder-gray-500"
        rows={3}
        placeholder="Write a comment..."
        required
        disabled={isLoading}
      ></textarea>
      <div className="flex justify-end items-center p-2 bg-gray-50 dark:bg-gray-800 border-t dark:border-gray-700 rounded-b-lg">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Posting...' : 'Post Comment'}
        </Button>
      </div>
    </form>
  );
}
