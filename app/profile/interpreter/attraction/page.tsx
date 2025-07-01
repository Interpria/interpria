'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchCurrentInterpreterId } from '@/app/components/CurrentInterpreter';

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function InterpreterAttractionsPage() {
  const [interpreterName, setInterpreterName] = useState<string>('');
  const [interpreterId, setInterpreterId] = useState<number | null>(null);
  const [attractions, setAttractions] = useState<any[]>([]);
  const [availability, setAvailability] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [deletingAvailabilityId, setDeletingAvailabilityId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Get current interpreter id
        const id = await fetchCurrentInterpreterId();
        if (!id) {
          setError('Interpreter not found.');
          setIsLoading(false);
          return;
        }
        setInterpreterId(id);

        // Fetch interpreter name
        const interpreterRes = await fetch(`/api/interpreter/${id}`);
        if (interpreterRes.ok) {
          const interpreterData = await interpreterRes.json();
          setInterpreterName(interpreterData?.name || (Array.isArray(interpreterData) ? interpreterData[0]?.name : ''));
        }

        // Fetch attractions for this interpreter
        const attrRes = await fetch(`/api/interpreterxattraction/interpreter/${id}`);
        const attrData = attrRes.ok ? await attrRes.json() : [];
        setAttractions(attrData);

        // Fetch availability for this interpreter
        const availRes = await fetch(`/api/interpreter/${id}/availability`);
        const availData = availRes.ok ? await availRes.json() : [];
        setAvailability(availData);

      } catch (err) {
        setError('Failed to load data');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (interpreterxattraction_id: number) => {
    if (!window.confirm('Are you sure you want to delete this attraction?')) return;
    setDeletingId(interpreterxattraction_id);
    try {
      const res = await fetch(`/api/interpreterxattraction/${interpreterxattraction_id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setAttractions((prev) => prev.filter(a => a.interpreterxattraction_id !== interpreterxattraction_id));
      } else {
        alert('Failed to delete attraction.');
      }
    } catch {
      alert('Failed to delete attraction.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleDeleteAvailability = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this availability?')) return;
    setDeletingAvailabilityId(id);
    try {
      const response = await fetch(`/api/availability-interpreter/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete availability');
      }

      // Remove the deleted availability from local state
      setAvailability((prev) => prev.filter(a => a.availability_id !== id));
    } catch (error) {
      console.error('Error deleting availability:', error);
      alert(error instanceof Error ? error.message : 'Failed to delete availability. Please try again.');
    } finally {
      setDeletingAvailabilityId(null);
    }
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
    <div className='container py-5'>
      <div className='card'>
        <div className='card-header'>
          <h1 className='card-title mb-0'>{interpreterName}</h1>
        </div>
        <div className='card-body mt-2'>
          <div className='row mt-4'>
            <div className='col-12'>
              <div className='d-flex justify-content-between align-items-center mb-3'>
                <div className='d-flex align-items-center gap-3'>
                  <h3 className='mb-0'>Attractions to Interpret</h3>
                  {interpreterId && (
                    <Link href={`/profile/interpreter/attraction/add`} className='btn btn-success'>
                      Add Attraction
                    </Link>
                  )}
                </div>
                <span className='badge bg-primary'>{attractions.length} Attractions</span>
              </div>

              {attractions.length > 0 ? (
                <div className='row g-3'>
                  {attractions.map((attraction) => {
                    const attractionAvailability = availability.filter(
                      avail => avail.attraction_id === attraction.attraction_id
                    );

                    return (
                      <div key={attraction.interpreterxattraction_id} className='col-md-6'>
                        <div className='card h-100'>
                          <div className='card-body'>
                            <div className='d-flex justify-content-between align-items-center mb-3'>
                              <h5 className='card-title mb-0'>
                                <Link href={`/dashboard/attraction/${attraction.attraction_id}`} className='text-decoration-none'>
                                  {attraction.attraction_name}
                                </Link>
                              </h5>
                              <button
                                className="btn btn-danger btn-sm"
                                disabled={deletingId === attraction.interpreterxattraction_id}
                                onClick={() => handleDelete(attraction.interpreterxattraction_id)}
                              >
                                {deletingId === attraction.interpreterxattraction_id ? 'Deleting...' : 'Remove'}
                              </button>
                            </div>
                            <div className='card-text'>
                              <ul className='list-unstyled mb-0'>
                                <li>Duration: {attraction.duration || 0} mins</li>
                                <li>Price: {attraction.price ? `${attraction.price} CAD` : 'Free'}</li>
                                <li>Buffer Time: {attraction.buffer_time || 0} mins</li>
                                <li>Max Travelers: {attraction.max_traveler || 'No limit'}</li>
                              </ul>
                              <div className='d-flex align-items-center mt-3 mb-2'>
                                <h6 className='mb-0'>Availability:</h6>
                                <Link
                                  href={`/profile/interpreter/attraction/${attraction.attraction_id}/add-availability`}
                                  className='btn btn-sm btn-outline-success ms-2'
                                  title="Add Availability"
                                >
                                  Add
                                </Link>
                              </div>
                              {attractionAvailability.length > 0 ? (
                                <ul className='list-unstyled mb-0'>
                                  {attractionAvailability
                                    .sort((a, b) => a.weekday - b.weekday)
                                    .map((availability) => (
                                      <li key={availability.availability_id} className="d-flex align-items-center">
                                        <span className='me-2'>{weekdays[availability.weekday]}</span>
                                        <span>
                                          {new Date(`2000-01-01T${availability.start_time}`).toLocaleTimeString('en-US', {
                                            hour: 'numeric',
                                            minute: '2-digit',
                                            hour12: true
                                          })} - {new Date(`2000-01-01T${availability.end_time}`).toLocaleTimeString('en-US', {
                                            hour: 'numeric',
                                            minute: '2-digit',
                                            hour12: true
                                          })}
                                        </span>
                                        <button
                                          className="btn btn-danger btn-sm ms-2"
                                          disabled={deletingAvailabilityId === availability.availability_id}
                                          onClick={() => handleDeleteAvailability(availability.availability_id)}
                                        >
                                          {deletingAvailabilityId === availability.availability_id ? 'Deleting...' : 'Delete'}
                                        </button>
                                      </li>
                                  ))}
                                </ul>
                              ) : (
                                <p className='text-muted mb-0'>No availability set</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className='alert alert-info'>
                  You have not added any attractions to interpret yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}