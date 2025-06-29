'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { fetchCurrentInterpreterId } from '@/app/components/currentInterpreter';

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function AddAvailabilityPage() {
  const router = useRouter();
  const params = useParams();
  const attractionId = Number(params.attractionId);

  const [interpreterId, setInterpreterId] = useState<number | null>(null);
  const [attractionName, setAttractionName] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    weekday: '',
    start_time: '',
    end_time: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const id = await fetchCurrentInterpreterId();
        if (!id) {
          setError('Interpreter not found.');
          setIsLoading(false);
          return;
        }
        setInterpreterId(id);

        // Fetch attraction name
        const attrRes = await fetch(`/api/attraction/${attractionId}`);
        if (attrRes.ok) {
          const attrData = await attrRes.json();
          setAttractionName(attrData?.name || (Array.isArray(attrData) ? attrData[0]?.name : ''));
        }
      } catch {
        setError('Failed to load data');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [attractionId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!interpreterId) return;

    try {
      const response = await fetch('/api/interpreter/[id]/availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          interpreter_id: interpreterId,
          attraction_id: attractionId,
          weekday: parseInt(formData.weekday),
          start_time: formData.start_time,
          end_time: formData.end_time,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add availability');
      }

      router.push(`/profile/interpreter/attraction`);
      router.refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to add availability. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (isLoading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="card mx-auto" style={{ maxWidth: 500 }}>
        <div className="card-header">
          <h3 className="mb-0">Add Availability for {attractionName}</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="weekday" className="form-label">Day of Week</label>
              <select
                className="form-select"
                id="weekday"
                name="weekday"
                value={formData.weekday}
                onChange={handleChange}
                required
              >
                <option value="">Select a day</option>
                {weekdays.map((day, index) => (
                  <option key={index} value={index}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="start_time" className="form-label">Start Time</label>
              <input
                type="time"
                className="form-control"
                id="start_time"
                name="start_time"
                value={formData.start_time}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="end_time" className="form-label">End Time</label>
              <input
                type="time"
                className="form-control"
                id="end_time"
                name="end_time"
                value={formData.end_time}
                onChange={handleChange}
                required
              />
            </div>
            <div className="d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => router.back()}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Add Availability
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}