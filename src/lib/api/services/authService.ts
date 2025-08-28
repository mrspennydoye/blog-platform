import axiosInstance from '../axiosInstance';
import { User } from '@/types';

export const login = async (email: string, password: string): Promise<User> => {
  const response = await axiosInstance.post('/users/login', { user: { email, password } });
  return response.data.user;
};

export const register = async (username: string, email: string, password: string): Promise<User> => {
  const response = await axiosInstance.post('/users', { user: { username, email, password } });
  return response.data.user;
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await axiosInstance.get('/user');
  return response.data.user;
};

export const updateUser = async (userData: Partial<User>): Promise<User> => {
  const response = await axiosInstance.put('/user', { user: userData });
  return response.data.user;
};