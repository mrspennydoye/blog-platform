import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Article, MultipleArticles, Comment, MultipleComments, Profile, TagList, User } from '@/types';

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://conduit-api.learnwebdriverio.com/api',
    prepareHeaders: (headers) => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
          headers.set('Authorization', `Token ${token}`);
        }
      }
      return headers;
    },
  }),
  tagTypes: ['Article', 'Comment', 'Profile'],
  endpoints: (builder) => ({
    getArticles: builder.query<MultipleArticles, { limit?: number; offset?: number }>({
      query: (params) => ({ url: '/articles', params }),
      providesTags: ['Article'],
    }),
    getArticle: builder.query<{ article: Article }, string>({
      query: (slug) => `/articles/${slug}`,
      providesTags: (result, error, slug) => [{ type: 'Article', id: slug }],
    }),
    createArticle: builder.mutation<{article: Article}, { title: string; description: string; body: string; tagList?: string[] }>({
      query: ({ title, description, body, tagList }) => ({
        url: '/articles',
        method: 'POST',
        body: { article: { title, description, body, tagList } },
      }),
      invalidatesTags: ['Article'],
    }),
    getComments: builder.query<MultipleComments, string>({
      query: (slug) => `/articles/${slug}/comments`,
      providesTags: (result, error, slug) => [{ type: 'Comment', id: slug }],
    }),
    addComment: builder.mutation<{ comment: Comment }, { slug: string; body: string }>({
      query: ({ slug, body }) => ({
        url: `/articles/${slug}/comments`,
        method: 'POST',
        body: { comment: { body } },
      }),
      invalidatesTags: (result, error, { slug }) => [{ type: 'Comment', id: slug }],
    }),
    deleteComment: builder.mutation<void, { slug: string; id: number }>({
      query: ({ slug, id }) => ({
        url: `/articles/${slug}/comments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { slug }) => [{ type: 'Comment', id: slug }],
    }),
  }),
});

export const { 
  useGetArticlesQuery, 
  useGetArticleQuery, 
  useCreateArticleMutation, 
  useGetCommentsQuery,
  useAddCommentMutation,
  useDeleteCommentMutation,
} = blogApi;
