'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Interpreterxattraction } from '@/app/lib/definitions';
import BookingForm from '@/app/components/bookingForm';
import { useSearchParams } from 'next/navigation';

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

interface InterpreterData {
  interpreter_id: number;
  user_id: number;
  gender: string;
  bio: string;
  introduction: string;
  primary_language_id: number;
  created_at: string;
  updated_at: string;
  name: string;
  email: string;
  phone?: string;
  languages: string;
  primary_language: string;
  rating: number | null;
}

interface AvailabilityData {
  availability_id: number;
  interpreter_id: number;
  attraction_id: number;
  weekday: number;
  start_time: string;
  end_time: string;
}

export default function InterpreterViewPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const [interpreterUser, setInterpreterUser] = useState<InterpreterData[]>([]);
  const [interpreterxattraction, setInterpreterxattraction] = useState<Interpreterxattraction[]>([]);
  const [availabilityInterpreter, setAvailabilityInterpreter] = useState<AvailabilityData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const attractionId = searchParams.get('attractionId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const { id } = await params;
        const interpreterId = parseInt(id);

        // Fetch all data in parallel
        const [interpreterResponse, attractionResponse, availabilityResponse] = await Promise.all([
          fetch(`/api/interpreter/${interpreterId}`),
          fetch(`/api/interpreterxattraction/interpreter/${interpreterId}`),
          fetch(`/api/interpreter/${interpreterId}/availability`)
        ]);

        if (!interpreterResponse.ok) {
          throw new Error('Failed to fetch interpreter data');
        }
        if (!attractionResponse.ok) {
          throw new Error('Failed to fetch attraction data');
        }
        if (!availabilityResponse.ok) {
          throw new Error('Failed to fetch availability data');
        }

        const [interpreterData, attractionData, availabilityData] = await Promise.all([
          interpreterResponse.json(),
          attractionResponse.json(),
          availabilityResponse.json()
        ]);

        setInterpreterUser(interpreterData);
        setInterpreterxattraction(attractionData);
        setAvailabilityInterpreter(availabilityData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load interpreter data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params]);

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

  if (!interpreterUser || interpreterUser.length === 0) {
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
        <div className='card-header d-flex justify-content-between align-items-center'>
          <h1 className='card-title mb-0'>{interpreterUser[0].name}</h1>
          {interpreterUser[0].rating ? (
            <span className="d-flex align-items-center ms-3">
              <i className="bi bi-star-fill" style={{ fontSize: 24, color: 'var(--orange-deep)' }}></i>
              <span className="ms-1 text-lg fw-semibold">{interpreterUser[0].rating}</span>
            </span>
          ) : null}
        </div>               
        <div className='card-body mt-2'>
          <div className='row'>
            <div className='col-md-6'>
              <table className='table'>
                <tbody>
                  <tr>
                    <th>Gender:</th>
                    <td>{interpreterUser[0].gender}</td>
                  </tr>
                  <tr>
                    <th>Introduction:</th>
                    <td>{interpreterUser[0].introduction}</td>
                  </tr>
                  <tr>
                    <th>Language:</th>
                    <td>{interpreterUser[0].primary_language}{interpreterUser[0].languages && (',' + interpreterUser[0].languages)}</td>
                  </tr>
                  <tr>
                    <th>Email:</th>
                    <td>{interpreterUser[0].email}</td>
                  </tr> 
                </tbody>
              </table>
            </div>
          </div>

          <div className='row mt-4'>
            <div className='col-12'>
              <div className='d-flex justify-content-between align-items-center mb-3'>
                <div className='d-flex align-items-center gap-3'>
                  <h3 className='mb-0'>Attractions to Interpret</h3>
                </div>
                <span className='badge bg-primary'>{interpreterxattraction.length} Attractions</span>
              </div>

              {interpreterxattraction.length > 0 ? (
                <div className='row g-3'>
                  {interpreterxattraction.map((attraction) => {
                    // Filter availability for this attraction
                    const attractionAvailability = availabilityInterpreter.filter(
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
                            </div>
                            <div className='card-text'>
                              <ul className='list-unstyled mb-0'>
                                <li>Duration: {attraction.duration || 0} mins</li>
                                <li>Price: {attraction.price ? `${attraction.price} CAD` : 'Free'}</li>
                                <li>Max Travelers: {attraction.max_traveler || 'No limit'}</li>
                              </ul>
                              <h6 className='mt-3 mb-2'>Availability:</h6>
                              {attractionAvailability.length > 0 ? (
                                <ul className='list-unstyled mb-0'>
                                  {attractionAvailability
                                    .sort((a, b) => a.weekday - b.weekday)
                                    .map((availability) => (
                                    <div key={availability.availability_id} className='mb-2'>
                                      <p className='mr-3 d-inline'>{weekdays[availability.weekday]}</p>
                                      {new Date(`2000-01-01T${availability.start_time}`).toLocaleTimeString('en-US', {
                                        hour: 'numeric',
                                        minute: '2-digit',
                                        hour12: true
                                      })} - {new Date(`2000-01-01T${availability.end_time}`).toLocaleTimeString('en-US', {
                                        hour: 'numeric',
                                        minute: '2-digit',
                                        hour12: true
                                      })}
                                    </div>
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
                  This interpreter has not added any attractions to interpret yet.
                </div>
              )}

              {attractionId && (
                <BookingForm
                  interpreterId={interpreterUser[0].interpreter_id}
                  attractionId={parseInt(attractionId, 10)}
                />
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}