'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Language } from '@/app/lib/definitions';

export default function CreateInterpreterPage() {
  const router = useRouter();
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    user_id: '',
    gender: '',
    bio: '',
    introduction: '',
    primary_language_id: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await fetch('/api/auth/login');
        if (res.ok) {
          const data = await res.json();
          if (data && data.user && data.user.userId) {
            const userRes = await fetch(`/api/user/${data.user.userId}`);
            const userData = await userRes.json();
            const currentUser = Array.isArray(userData) ? userData[0] : userData;
            setFormData(prev => ({
              ...prev,
              user_id: currentUser.user_id?.toString() || ''
            }));
          } else {
            throw new Error('User not found');
          }
        } else {
          throw new Error('Failed to fetch user');
        }
      } catch (err) {
        console.error('Error fetching current user:', err);
        setError('Failed to load user information');
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentUser();
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

      router.push('/profile/interpreter');
      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='container py-5'>
      <h1 className='mb-4'>Become an Interpreter</h1>
      
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className='row'>
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
          <button type="submit" className='btn btn-primary me-2'>Submit</button>
          <button type="button" className='btn btn-secondary' onClick={() => router.back()}>Cancel</button>
        </div>
      </form>
    </div>
  );
}