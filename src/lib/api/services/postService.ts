import axiosInstance from '../axiosInstance';
import { Article, MultipleArticles } from '@/types';

export const getArticles = async (params: { limit?: number; offset?: number; tag?: string; author?: string; favorited?: string }): Promise<MultipleArticles> => {
  const response = await axiosInstance.get('/articles', { params });
  return response.data;
};

export const getFeed = async (params: { limit?: number; offset?: number }): Promise<MultipleArticles> => {
  const response = await axiosInstance.get('/articles/feed', { params });
  return response.data;
};

export const getArticle = async (slug: string): Promise<Article> => {
  const response = await axiosInstance.get(`/articles/${slug}`);
  return response.data.article;
};

export const createArticle = async (article: { title: string; description: string; body: string; tagList?: string[] }): Promise<Article> => {
  const response = await axiosInstance.post('/articles', { article });
  return response.data.article;
};

export const updateArticle = async (slug: string, article: Partial<{ title: string; description: string; body: string }>): Promise<Article> => {
  const response = await axiosInstance.put(`/articles/${slug}`, { article });
  return response.data.article;
};

export const deleteArticle = async (slug: string): Promise<void> => {
  await axiosInstance.delete(`/articles/${slug}`);
};

export const favoriteArticle = async (slug: string): Promise<Article> => {
  const response = await axiosInstance.post(`/articles/${slug}/favorite`);
  return response.data.article;
};

export const unfavoriteArticle = async (slug: string): Promise<Article> => {
  const response = await axiosInstance.delete(`/articles/${slug}/favorite`);
  return response.data.article;
};