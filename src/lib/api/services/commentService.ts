import axiosInstance from '../axiosInstance';
import { Comment, MultipleComments } from '@/types';

export const addComment = async (slug: string, body: string): Promise<Comment> => {
  const response = await axiosInstance.post(`/articles/${slug}/comments`, { comment: { body } });
  return response.data.comment;
};

export const getComments = async (slug: string): Promise<MultipleComments> => {
  const response = await axiosInstance.get(`/articles/${slug}/comments`);
  return response.data;
};

export const deleteComment = async (slug: string, id: number): Promise<void> => {
  await axiosInstance.delete(`/articles/${slug}/comments/${id}`);
};