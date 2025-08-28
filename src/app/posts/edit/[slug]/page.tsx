'use client';

import { useState, useEffect, use } from 'react';
import { useGetArticleQuery } from '@/store/api/blogApi';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Loader from '@/components/ui/Loader';

export default function EditPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;

  const { data: articleData, isLoading } = useGetArticleQuery(slug);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (articleData) {
      const { article } = articleData;
      setTitle(article.title);
      setDescription(article.description);
      setBody(article.body);
      setTags(article.tagList.join(', '));
    }
  }, [articleData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Edit Article
          </h2>
        </div>
        <Card>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label="Article Title"
              id="title"
              name="title"
              type="text"
              placeholder="What's the title of your article?"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
                  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Write your article (in markdown)"
                value={body}
                onChange={(e) => setBody(e.target.value)}
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
            />
            <div className="flex justify-end">
              <Button type="submit" className="px-6">
                Update Article
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}