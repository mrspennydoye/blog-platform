'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { getProfile } from '@/lib/api/services/profileService';
import { Profile } from '@/types';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Loader from '@/components/ui/Loader';
import Image from 'next/image';

export default function ProfilePage() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user?.username) {
        setIsLoading(true);
        setError(null);
        try {
          const profileData = await getProfile(user.username);
          setProfile(profileData);
        } catch (err) {
          setError('Failed to fetch profile. Please try again later.');
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }
  
  if (!user || !profile) {
    return <div className="min-h-screen flex items-center justify-center">Please log in to view your profile.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="text-center">
          <div className="flex flex-col items-center">
            <Image
              className="w-24 h-24 rounded-full mb-4"
              src={profile.image || 'https://static.productionready.io/images/smiley-cyrus.jpg'}
              alt={profile.username}
            />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{profile.username}</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">{profile.bio || 'No bio available.'}</p>
          </div>
          <div className="mt-6">
            <Button variant="outline">
              Edit Profile Settings
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
