import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PostCard from '@/components/PostCard';

const mockPost = {
  slug: 'test-slug',
  title: 'Test Title',
  description: 'Test Desc',
  body: 'Test Body',
  tagList: ['tag1'],
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z',
  favorited: false,
  favoritesCount: 0,
  author: {
    username: 'user',
    bio: null,
    image: null,
    following: false,
  },
};

test('renders post card', () => {
  render(<PostCard post={mockPost} />);
  expect(screen.getByText('Test Title')).toBeInTheDocument();
  expect(screen.getByText('Test Desc')).toBeInTheDocument();
});