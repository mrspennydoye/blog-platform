import axiosInstance from '../axiosInstance';
import { TagList } from '@/types';

export const getTags = async (): Promise<TagList> => {
  const response = await axiosInstance.get('/tags');
  return response.data;
};