import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import PostsPage from '@/app/page';

// Mock the RTK Query hook used in the component
jest.mock('@/store/api/blogApi', () => ({
  // We need to keep the actual implementation of createApi available
  ...jest.requireActual('@/store/api/blogApi'),
  // But we mock the hook itself
  useGetArticlesQuery: jest.fn(),
}));

// Import the mocked hook after the jest.mock call
import { useGetArticlesQuery } from '@/store/api/blogApi';

describe('PostsPage', () => {
  // Cast the mock to the correct type for TypeScript
  const useGetArticlesQueryMock = useGetArticlesQuery as jest.Mock;

  beforeEach(() => {
    // Reset mocks before each test
    useGetArticlesQueryMock.mockClear();
  });

  test('renders the main heading and posts when data is loaded', async () => {
    // Provide a mock return value for the hook
    useGetArticlesQueryMock.mockReturnValue({
      data: {
        articles: [
          { slug: 'post-1', title: 'First Post', description: 'Desc 1', author: { username: 'author1' }, tagList: [] },
        ],
        articlesCount: 1
      },
      isLoading: false,
      error: null,
    });

    render(
      <Provider store={store}>
        <PostsPage />
      </Provider>
    );

    // The main heading should be present
    const heading = await screen.findByRole('heading', { name: /posts/i });
    expect(heading).toBeInTheDocument();

    // A post title should be present
    expect(screen.getByText('First Post')).toBeInTheDocument();
  });

  test('displays a loader while fetching data', () => {
    // Mock the loading state
    useGetArticlesQueryMock.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });

    render(
      <Provider store={store}>
        <PostsPage />
      </Provider>
    );

    // Check if the loader component is rendered using its test ID
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  test('displays an error message if fetching fails', () => {
    // Mock the error state
    useGetArticlesQueryMock.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error('Failed to fetch'), // Mock an error object
    });

    render(
      <Provider store={store}>
        <PostsPage />
      </Provider>
    );

    // Check if the error message is displayed
    expect(screen.getByText('Error loading posts')).toBeInTheDocument();
  });
});
