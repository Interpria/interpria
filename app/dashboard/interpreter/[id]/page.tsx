import { fetchInterpreterById, fetchInterpreterxattractionByInterpreterId } from '@/app/lib/data';
import Link from 'next/link';
import { Interpreterxattraction } from '@/app/lib/definitions';

export default async function InterpreterDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const interpreterId = parseInt(id);
  
  // Fetch both interpreter details and attractions
  const [interpreterUser, interpreterxattraction] = await Promise.all([
    fetchInterpreterById(interpreterId),
    fetchInterpreterxattractionByInterpreterId(interpreterId)
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
                    <td>{interpreterUser[0].languages}</td>
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
                    <td>{interpreterUser[0].phone_num || 'Not provided'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className='row mt-4'>
            <div className='col-12'>
              <div className='d-flex justify-content-between align-items-center mb-3'>
                <h3 className='mb-0'>Attractions to Interpret</h3>
                <span className='badge bg-primary'>{interpreterxattraction.length} Attractions</span>
              </div>

              {interpreterxattraction.length > 0 ? (
                <div className='row g-3'>
                  {(interpreterxattraction as Interpreterxattraction[]).map((attraction) => (
                    <div key={attraction.interpreterxattraction_id} className='col-md-6'>
                      <div className='card h-100'>
                        <div className='card-body'>
                          <h5 className='card-title'>
                            <Link href={`/dashboard/attraction/${attraction.attraction_id}`} className='text-decoration-none'>
                              {attraction.attraction_name}
                            </Link>
                          </h5>
                          <div className='card-text'>
                            <ul className='list-unstyled mb-0'>
                              <li>Duration: {attraction.duration || 0} mins</li>
                              <li>Price: {attraction.price ? `${attraction.price} CAD` : 'Free'}</li>
                              <li>Buffer Time: {attraction.buffer_time || 0} mins</li>
                              <li>Max Travelers: {attraction.max_traveler || 'No limit'}</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
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