'use client';

import { useState, useEffect } from 'react';
import { Interpreterxattraction } from '@/app/lib/definitions';
import { useRouter } from 'next/navigation';

interface InterpreterSectionProps {
  attractionId: number;
  attractionName: string;
}

interface InterpreterWithDetails extends Interpreterxattraction {
  name: string;
  bio: string;
  languages: string;
  primary_language: string;
  rating: number | null;
}

export default function InterpreterSection({ attractionId, attractionName }: InterpreterSectionProps) {
  const [interpreters, setInterpreters] = useState<InterpreterWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    const fetchInterpreters = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/interpreterxattraction/attraction/${attractionId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch interpreter data');
        }
        const data = await response.json();
        console.log(data);
        setInterpreters(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching interpreter data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (attractionId) {
      fetchInterpreters();
    }
  }, [attractionId]);

  if (loading) {
    return (
      <div className="mt-8 p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Loading interpreters...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Error loading interpreters</h2>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (interpreters.length === 0) {
    return (
      <div className="mt-8 p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">No interpreters available for {attractionName}</h2>
      </div>
    );
  }

  return (
    <div className="mt-8 p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Available Interpreters for {attractionName}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {interpreters.map((interpreter) => (
          <div key={interpreter.interpreterxattraction_id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium mb-0">{interpreter.name}</h3>
              {interpreter.rating ? (
                <span className="flex items-center">
                  <i className="bi bi-star-fill" style={{ fontSize: 24, color: 'var(--orange-deep)' }}></i>
                  <span className="ml-1 text-lg font-semibold">{interpreter.rating}</span>
                </span>
              ) : null}
            </div>
            <div className="space-y-2">
              <p><span className="font-medium">Bio:</span> {interpreter.bio}</p>
              <p>
                <span className="font-medium">Languages:</span>{' '}
                {interpreter.primary_language}
                {interpreter.languages && interpreter.languages.trim() && (
                  <>,{interpreter.languages}</>
                )}
              </p>
              <p><span className="font-medium">Tour Duration:</span> {interpreter.duration} minutes</p>
              <p><span className="font-medium">Max people:</span> {interpreter.max_traveler}</p>
              <p><span className="font-medium">Price:</span> ${interpreter.price}</p>
              <button 
                className="mt-2 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                onClick={() => {
                  // Handle booking or more details
                  router.push(`/interpreter/${interpreter.interpreter_id}?attractionId=${attractionId}`);
                }}
              >
                Check Availability
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}