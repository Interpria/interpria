import { fetchInterpreterxattractionByAttractionId } from '@/app/lib/attraction';
import { fetchAttractionById } from '@/app/lib/attraction';
import { fetchInterpreterById } from '@/app/lib/interpreter';
import Link from 'next/link';
import DeleteAttractionButton from '../DeleteAttractionButton';
import AvailabilityAttractionSection from '@/app/components/AvailabilityAttractionSection';

export default async function AttractionDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const attractionId = parseInt(id);
  
  // First fetch attraction and interpreterxattraction
  const [attraction, interpreterxattraction] = await Promise.all([
    fetchAttractionById(attractionId),
    fetchInterpreterxattractionByAttractionId(attractionId)
  ]);

  // Then fetch all interpreter details
  const interpreterById = interpreterxattraction.length > 0 
    ? await Promise.all(
        interpreterxattraction.map(ia => fetchInterpreterById(ia.interpreter_id))
      ).then(results => results.flat())
    : [];

  return (
    <div className='container py-4'>
      <div className='row'>
        <div className='col-md-12'>
          <div className='d-flex justify-content-between align-items-center mb-4'>
            <h2 className='mb-0'>{attraction[0].name}</h2>
            <DeleteAttractionButton attractionId={attractionId} />
          </div>
          <div className='card mb-4'>
            <div className='card-body'>
              <h5 className='card-title'>Details</h5>
              <div className='card-text'>
                <p><strong>Description:</strong> {attraction[0].description}</p>
                <p><strong>Address:</strong> {attraction[0].address}</p>
                <p><strong>Postal Code:</strong> {attraction[0].postal_code}</p>
                <p><strong>City:</strong> {attraction[0].city}</p>
                <p><strong>Province:</strong> {attraction[0].province}</p>
                <p><strong>Country:</strong> {attraction[0].country}</p>
                <p><strong>Email:</strong> {attraction[0].email}</p>
                <p><strong>Phone:</strong> {attraction[0].phone}</p>
                <p><strong>Website:</strong> {attraction[0].website}</p>
                <p><strong>Category:</strong> {attraction[0].category}</p>
                <p><strong>Longitude:</strong> {attraction[0].longitude}</p>
                <p><strong>Latitude:</strong> {attraction[0].latitude}</p>
                <p><strong>Is Closed:</strong> {attraction[0].is_closed ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </div>

          <AvailabilityAttractionSection
            attractionId={attractionId}
          />

          <div className='card mb-4'>
            <div className='card-body'>
              <h5 className='card-title'>Available Interpreters</h5>
              {interpreterxattraction.length > 0 ? (
                <div className='row g-3'>
                  {interpreterxattraction.map((interpreter) => {
                    const interpreterUsers = interpreterById.filter(
                      (interpreterData) => interpreterData.interpreter_id === interpreter.interpreter_id
                    );
                    
                    if (!interpreterUsers || interpreterUsers.length === 0) {
                      return null;
                    }

                    const interpreterData = interpreterUsers[0];
                    
                    return (
                      <div key={interpreter.interpreterxattraction_id} className='col-md-6'>
                        <div className='card h-100'>
                          <div className='card-body'>
                            <h5 className='card-title'>
                              <Link href={`/dashboard/interpreter/${interpreter.interpreter_id}`} className='text-decoration-none'>
                                {interpreterData.name}
                              </Link>
                            </h5>
                            <div className='card-text'>
                              <ul className='list-unstyled mb-0'>
                                <li>Duration: {interpreter.duration || 0} mins</li>
                                <li>Buffer Time: {interpreter.buffer_time || 0} mins</li>
                                <li>Max Travelers: {interpreter.max_traveler || 'No limit'}</li>
                                <li>Price: {interpreter.price ? `${interpreter.price} CAD` : 'Free'}</li>
                                <li>Language: {interpreterData.primary_language}{interpreterData.languages && (',' + interpreterData.languages)}</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className='text-muted mb-0'>No interpreters available for this attraction</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}