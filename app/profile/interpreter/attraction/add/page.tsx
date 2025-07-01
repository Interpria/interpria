'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Attraction, Interpreter } from '@/app/lib/definitions';
import { fetchCurrentInterpreterId } from '@/app/components/CurrentInterpreter';

export default function AddAttractionPage() {
  const router = useRouter();
  const [interpreter, setInterpreter] = useState<Interpreter | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [selectedAttraction, setSelectedAttraction] = useState<number | ''>('');
  const [formData, setFormData] = useState({
    duration: '',
    buffer_time: '',
    max_traveler: '',
    price: '',
  });
    
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
      setInterpreter(Array.isArray(data) ? data[0] : data);
      } catch (err) {
      setError('Failed to load interpreter data');
      } finally {
      setIsLoading(false);
      }
  };
  getInterpreter();
  }, []);

  useEffect(() => {
    const loadAttractions = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch('/api/attraction');
        if (!response.ok) {
          throw new Error('Failed to fetch attractions');
        }
        const data = await response.json();
        setAttractions(data);
      } catch (error) {
        console.error('Error loading attractions:', error);
        setError('Failed to load attractions. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    loadAttractions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedAttraction) {
      alert('Please select an attraction');
      return;
    }

    try {
      const response = await fetch('/api/interpreterxattraction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          interpreter_id: interpreter?.interpreter_id,
          attraction_id: selectedAttraction,
          duration: parseInt(formData.duration) || 0,
          price: formData.price ? parseFloat(formData.price) : null,
          buffer_time: parseInt(formData.buffer_time) || 0,
          max_traveler: formData.max_traveler ? parseInt(formData.max_traveler) : null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add attraction');
      }

      router.push(`/profile/interpreter/attraction`);
      router.refresh();
    } catch (error) {
      console.error('Error adding attraction:', error);
      alert(error instanceof Error ? error.message : 'Failed to add attraction. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'attraction') {
      setSelectedAttraction(value ? parseInt(value) : '');
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  if (isLoading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading attractions...</p>
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
        <Link href={`/profile/interpreter/attraction`} className="btn btn-secondary">
          Back to Attraction Details
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="mb-4">
        <Link href={`/profile/interpreter/attraction`} className="btn btn-secondary">
          ← Back to Attraction Details
        </Link>
      </div>

      <div className="card">
        <div className="card-header">
          <h1 className="card-title mb-0">Add Attraction to Interpret</h1>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="attraction" className="form-label">Select Attraction</label>
              <select
                className="form-select"
                id="attraction"
                name="attraction"
                value={selectedAttraction}
                onChange={handleChange}
                required
              >
                <option value="">Choose an attraction...</option>
                {attractions.map((attraction) => (
                  <option key={attraction.attraction_id} value={attraction.attraction_id}>
                    {attraction.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="duration" className="form-label">Duration (minutes)</label>
              <input
                type="number"
                className="form-control"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                min="0"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="bufferTime" className="form-label">Buffer Time (minutes)</label>
              <input
                type="number"
                className="form-control"
                id="bufferTime"
                name="buffer_time"
                value={formData.buffer_time}
                onChange={handleChange}
                min="0"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="maxTraveler" className="form-label">Maximum Travelers</label>
              <input
                type="number"
                className="form-control"
                id="maxTraveler"
                name="max_traveler"
                value={formData.max_traveler}
                onChange={handleChange}
                min="1"
              />
            </div>
                      
            <div className="mb-3">
              <label htmlFor="price" className="form-label">Price (CAD)</label>
              <input
                type="number"
                className="form-control"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
              />
            </div>

            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-primary">
                Add Attraction
              </button>
              <Link href={`/profile/interpreter/attraction`} className="btn btn-secondary">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 