import axiosInstance from '../axiosInstance';
import { Profile } from '@/types';

export const getProfile = async (username: string): Promise<Profile> => {
  const response = await axiosInstance.get(`/profiles/${username}`);
  return response.data.profile;
};

export const followUser = async (username: string): Promise<Profile> => {
  const response = await axiosInstance.post(`/profiles/${username}/follow`);
  return response.data.profile;
};

export const unfollowUser = async (username: string): Promise<Profile> => {
  const response = await axiosInstance.delete(`/profiles/${username}/follow`);
  return response.data.profile;
};