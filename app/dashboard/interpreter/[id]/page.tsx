import { fetchInterpreterById } from '@/app/api/interpreter/[id]/route';
import { fetchAvailabilityInterpreterByInterpreterId } from '@/app/api/interpreter/[id]/availability/route';
import { fetchInterpreterxattractionByInterpreterId } from '@/app/api/interpreterxattraction/interpreter/[interpreterId]/route';
import Link from 'next/link';
import { Interpreterxattraction } from '@/app/lib/definitions';
import UpdateLanguagesButton from './UpdateLanguagesButton';
import DeleteAttractionButton from './DeleteAttractionButton';
import AddAvailabilityButton from './AddAvailabilityButton';
import DeleteAvailabilityButton from './DeleteAvailabilityButton';

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default async function InterpreterDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const interpreterId = parseInt(id);
  
  // Fetch both interpreter details and attractions
  const [interpreterUser, interpreterxattraction, availabilityInterpreter] = await Promise.all([
    fetchInterpreterById(interpreterId),
    fetchInterpreterxattractionByInterpreterId(interpreterId),
    fetchAvailabilityInterpreterByInterpreterId(interpreterId)
  ]);

  return (
    <div className='container py-5'>
      <div className='mb-4'>
        <Link href="/dashboard/interpreter" className='btn btn-secondary'>
          ← Back to Interpreter List
        </Link>
      </div>

      <div className='card'>
        <div className='card-header'>
          <h1 className='card-title mb-0'>{interpreterUser[0].name}</h1>
        </div>
        <div className='card-body mt-2'>
          <div className='row'>
            <div className='col-md-6'>
              <h3>Interpreter Personal Information</h3>
              <table className='table'>
                <tbody>
                  <tr>
                    <th>ID:</th>
                    <td>{interpreterUser[0].interpreter_id}</td>
                  </tr>
                  <tr>
                    <th>Gender:</th>
                    <td>{interpreterUser[0].gender}</td>
                  </tr>
                  <tr>
                    <th>Bio:</th>
                    <td>{interpreterUser[0].bio}</td>
                  </tr>
                  <tr>
                    <th>Introduction:</th>
                    <td>{interpreterUser[0].introduction}</td>
                  </tr>
                  <tr>
                    <th>Primary Language:</th>
                    <td>{interpreterUser[0].primary_language}</td>
                  </tr>
                  <tr>
                    <th>Other Languages:</th>
                    <td>
                      {interpreterUser[0].languages}
                      <div className="mt-2">
                        <UpdateLanguagesButton 
                          interpreterId={interpreterUser[0].interpreter_id}
                          currentLanguages={interpreterUser[0].languages}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>Created At:</th>
                    <td>{new Date(interpreterUser[0].created_at).toLocaleDateString()}</td>
                  </tr>
                  <tr>
                    <th>Updated At:</th>
                    <td>{new Date(interpreterUser[0].updated_at).toLocaleDateString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className='col-md-6'>
              <h3>User Information</h3>
              <table className='table'>
                <tbody>
                  <tr>
                    <th>User ID:</th>
                    <td><Link href={`/dashboard/user/${interpreterUser[0].user_id}`}>{interpreterUser[0].user_id}</Link></td>
                  </tr>
                  <tr>
                    <th>Name:</th>
                    <td>{interpreterUser[0].name}</td>
                  </tr>
                  <tr>
                    <th>Email:</th>
                    <td>{interpreterUser[0].email}</td>
                  </tr>
                  <tr>
                    <th>Phone Number:</th>
                    <td>{interpreterUser[0].phone || 'Not provided'}</td>
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
                  <Link href={`/dashboard/interpreter/${interpreterId}/add-attraction`} className='btn btn-success'>
                    Add Attraction
                  </Link>
                </div>
                <span className='badge bg-primary'>{interpreterxattraction.length} Attractions</span>
              </div>

              {interpreterxattraction.length > 0 ? (
                <div className='row g-3'>
                  {(interpreterxattraction as Interpreterxattraction[]).map((attraction) => {
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
                              <DeleteAttractionButton 
                                interpreterId={interpreterId}
                                attractionId={attraction.attraction_id}
                                attractionName={attraction.attraction_name}
                              />
                            </div>
                            <div className='card-text'>
                              <ul className='list-unstyled mb-0'>
                                <li>Duration: {attraction.duration || 0} mins</li>
                                <li>Price: {attraction.price ? `${attraction.price} CAD` : 'Free'}</li>
                                <li>Buffer Time: {attraction.buffer_time || 0} mins</li>
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
                                      <DeleteAvailabilityButton 
                                        availabilityId={availability.availability_id}
                                        weekday={weekdays[availability.weekday]}
                                        startTime={new Date(`2000-01-01T${availability.start_time}`).toLocaleTimeString('en-US', {
                                          hour: 'numeric',
                                          minute: '2-digit',
                                          hour12: true
                                        })}
                                        endTime={new Date(`2000-01-01T${availability.end_time}`).toLocaleTimeString('en-US', {
                                          hour: 'numeric',
                                          minute: '2-digit',
                                          hour12: true
                                        })}
                                      />
                                    </div>
                                  ))}
                                </ul>
                              ) : (
                                <p className='text-muted mb-0'>No availability set</p>
                              )}
                              <div className='mt-2'>
                                <AddAvailabilityButton 
                                  interpreterId={interpreterId}
                                  attractionId={attraction.attraction_id}
                                  attractionName={attraction.attraction_name}
                                />
                              </div>
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

            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 