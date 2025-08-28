'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createArticle } from '@/lib/api/services/postService';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';

export default function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const articleData = {
        title,
        description,
        body,
        tagList: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      };
      const newArticle = await createArticle(articleData);
      router.push(`/posts/${newArticle.slug}`);
    } catch (err) {
      setError('Failed to create the article. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Create a New Post
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Share your thoughts with the world.
          </p>
        </div>
        <Card>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <Input
              label="Article Title"
              id="title"
              name="title"
              type="text"
              placeholder="What's the title of your article?"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isLoading}
            />
            <Input
              label="Description"
              id="description"
              name="description"
              type="text"
              placeholder="What's this article about?"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isLoading}
            />
            <div>
              <label htmlFor="body" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Article Body
              </label>
              <textarea
                id="body"
                name="body"
                rows={8}
                className="block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-sm shadow-sm placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="Write your article (in markdown)"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                disabled={isLoading}
              ></textarea>
            </div>
            <Input
              label="Tags"
              id="tags"
              name="tags"
              type="text"
              placeholder="Enter tags, separated by commas"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              disabled={isLoading}
            />
            <div className="flex justify-end">
              <Button type="submit" className="px-6" disabled={isLoading}>
                {isLoading ? 'Publishing...' : 'Publish Article'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
