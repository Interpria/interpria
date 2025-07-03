'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Interpreter, Language } from '@/app/lib/definitions';
import { fetchCurrentInterpreterId } from '@/app/components/CurrentInterpreter';

export default function UpdateInterpreterPage() {
  const router = useRouter();
  const [interpreter, setInterpreter] = useState<Interpreter | null>(null);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    bio: '',
    introduction: '',
    primary_language_id: '',
  });
  const [error, setError] = useState<string | null>(null);

  // Load interpreter info and set formData with previous/saved info
  useEffect(() => {
    const getInterpreter = async () => {
      setLoading(true);
      setError(null);
      try {
        const interpreterId = await fetchCurrentInterpreterId();
        if (!interpreterId) {
          setError('Interpreter not found.');
          setLoading(false);
          return;
        }
        const response = await fetch(`/api/interpreter/${interpreterId}`);
        if (!response.ok) {
          setError('Failed to fetch interpreter data');
          setLoading(false);
          return;
        }
        const data = await response.json();
        const interpreterData = Array.isArray(data) ? data[0] : data;
        setInterpreter(interpreterData);
        // Set form fields to previous/saved info from DB
        setFormData({
          bio: interpreterData.bio || '',
          introduction: interpreterData.introduction || '',
          primary_language_id: interpreterData.primary_language_id ? interpreterData.primary_language_id.toString() : '',
        });
      } catch {
        setError('Failed to load interpreter data');
      } finally {
        setLoading(false);
      }
    };
    getInterpreter();
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
      } catch {
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
    if (!interpreter) {
      setError('Interpreter not found');
      return;
    }
    try {
      const response = await fetch(`/api/interpreter/${interpreter.interpreter_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bio: formData.bio,
          introduction: formData.introduction,
          primary_language_id: parseInt(formData.primary_language_id),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to update interpreter');
      }

      router.push('/profile/interpreter');
      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  if (loading) {
    return (
      <div className='container py-5'>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className='container py-5'>
      <h1 className='mb-4'>Edit Interpreter Profile</h1>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className='row'>
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
          <button type="submit" className='btn btn-primary me-2'>Confirm</button>
          <button type="button" className='btn btn-secondary' onClick={() => router.back()}>Cancel</button>
        </div>
      </form>
    </div>
  );
}