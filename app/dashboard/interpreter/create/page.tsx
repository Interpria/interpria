'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Language, User } from '@/app/lib/definitions';

export default function CreateInterpreterPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [formData, setFormData] = useState({
    user_id: '',
    gender: '',
    bio: '',
    introduction: '',
    primary_language_id: '',
  });
  const [error, setError] = useState('');

  // Fetch users when component mounts
  useEffect(() => {
    const loadUsers = async () => {
      try {
        // First get all users
        const response = await fetch('/api/user');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const usersData = await response.json();

        // Then get all interpreters
        const interpreterResponse = await fetch('/api/interpreter');
        if (!interpreterResponse.ok) {
          throw new Error('Failed to fetch interpreters');
        }
        const interpreters = await interpreterResponse.json();

        // Filter out users who are already interpreters
        const interpreterUserIds = interpreters.map((i: any) => i.user_id);
        const availableUsers = usersData.filter((user: User) => !interpreterUserIds.includes(user.user_id));

        setUsers(availableUsers);
      } catch (error) {
        console.error('Error loading users:', error);
        setError('Failed to load users');
      }
    };
    loadUsers();
  }, []);

  useEffect(() => {
    const loadLanguages = async () => {
      try {
        const response = await fetch('/api/language');
        if (!response.ok) {
          throw new Error('Failed to fetch languages');
        }
        const languagesData = await response.json();
        setLanguages(languagesData);
      } catch (error) {
        console.error('Error loading languages:', error);
        setError('Failed to load languages');
      }
    };
    loadLanguages();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/interpreter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          user_id: parseInt(formData.user_id),
          primary_language_id: parseInt(formData.primary_language_id),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to create interpreter');
      }

      router.push('/dashboard/interpreter');
      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  return (
    <div className='container py-5'>
      <h1 className='mb-4'>Create New Interpreter</h1>
      
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className='row'>
          <div className='col-md-6'>
            <label className='form-label'>User</label>
            <select
              name="user_id"
              value={formData.user_id}
              onChange={handleChange}
              className='form-select'
              required
            >
              <option value="">Select a user</option>
              {users.map((user) => (
                <option key={user.user_id} value={user.user_id}>
                  {user.name} ({user.email})
                </option>
              ))}
            </select>
          </div>

          <div className='col-md-6'>
            <label className='form-label'>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className='form-select'
              required
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className='col-md-6'>
            <label className='form-label'>Primary Language</label>
            <select
              name="primary_language_id"
              value={formData.primary_language_id}
              onChange={handleChange}
              className='form-select'
              required
            >
              <option value="">Select primary language</option>
              {languages.map((language) => (
                <option key={language.language_id} value={language.language_id}>
                  {language.name}
                </option>
              ))}
            </select>
          </div>

          <div className='col-12'>
            <label className='form-label'>Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className='form-control'
              rows={2}
              required
            />
          </div>

          <div className='col-12'>
            <label className='form-label'>Introduction</label>
            <textarea
              name="introduction"
              value={formData.introduction}
              onChange={handleChange}
              className='form-control'
              rows={4}
              required
            />
          </div>
        </div>

        <div className='mt-4'>
          <button type="submit" className='btn btn-primary me-2'>Create Interpreter</button>
          <button type="button" className='btn btn-secondary' onClick={() => router.back()}>Cancel</button>
        </div>
      </form>
    </div>
  );
} 