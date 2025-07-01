'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchCurrentInterpreterId } from '@/app/components/CurrentInterpreter';
import UpdateLanguagesButton from '@/app/components/UpdateLanguagesButton';

interface InterpreterData {
  interpreter_id: number;
  user_id: number;
  gender: string;
  bio: string;
  introduction: string;
  primary_language_id: number;
  name: string;
  email: string;
  phone?: string;
  languages: string;
  primary_language: string;
  rating: number | null;
}

export default function InterpreterViewPage() {
  const [interpreterUser, setInterpreterUser] = useState<InterpreterData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getInterpreter = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const interpreterId = await fetchCurrentInterpreterId();
        if (!interpreterId) {
          setError('Interpreter not found.');
          setIsLoading(false);
          return;
        }
        const response = await fetch(`/api/interpreter/${interpreterId}`);
        if (!response.ok) {
          setError('Failed to fetch interpreter data');
          setIsLoading(false);
          return;
        }
        const data = await response.json();
        setInterpreterUser(Array.isArray(data) ? data[0] : data);
      } catch (err) {
        setError('Failed to load interpreter data');
      } finally {
        setIsLoading(false);
      }
    };
    getInterpreter();
  }, []);

  if (isLoading) {
    return (
      <div className='container py-5'>
        <div className='text-center'>
          <div className='spinner-border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
          <p className='mt-2'>Loading interpreter data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='container py-5'>
        <div className='alert alert-danger' role='alert'>
          {error}
        </div>
      </div>
    );
  }

  if (!interpreterUser) {
    return (
      <div className='container py-5'>
        <div className='alert alert-warning' role='alert'>
          Interpreter not found.
        </div>
      </div>
    );
  }

  return (
    <div className='container py-5'>
      <div className='card'>
        <div className='card-header'>
          <h1 className='card-title mb-0'>{interpreterUser.name}</h1>
        </div>
        <div className='card-body mt-2'>
          <div className='row'>
            <div className='col-md-6'>
              <table className='table'>
                <tbody>
                  <tr>
                    <th>Rating:</th>
                    <td>{interpreterUser.rating ? interpreterUser.rating : 'No rating yet'}</td>
                  </tr>
                  <tr>
                    <th>Gender:</th>
                    <td>{interpreterUser.gender}</td>
                  </tr>
                  <tr>
                    <th>Bio:</th>
                    <td>{interpreterUser.bio}</td>
                  </tr>
                  <tr>
                    <th>Introduction:</th>
                    <td>{interpreterUser.introduction}</td>
                  </tr>
                  <tr>
                    <th>Primary Language:</th>
                    <td>
                      {interpreterUser.primary_language}                      
                    </td>
                  </tr>
                  <tr>
                    <th>Other Languages:</th>
                    <td>{interpreterUser.languages}
                      <div className="mt-2">
                        <UpdateLanguagesButton 
                          interpreterId={interpreterUser.interpreter_id}
                          currentLanguages={interpreterUser.languages}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>Email:</th>
                    <td>
                      {interpreterUser.email}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-4">
                <Link href="/profile/interpreter/edit-profile" className="btn btn-warning">
                  Edit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

