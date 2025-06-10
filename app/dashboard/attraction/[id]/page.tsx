import { fetchAttractionById } from '@/app/lib/data';
import Link from 'next/link';

export default async function AttractionDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const attraction = await fetchAttractionById(parseInt(id));
  return (
    <div className='container py-5'>
      <div className='mb-4'>
        <Link href="/dashboard/attraction" className='btn btn-secondary'>
          ← Back to Attraction List
        </Link>
      </div>

      <div className='card'>
        <div className='card-header'>
          <h1 className='card-title mb-0'>{attraction[0].name}</h1>
        </div>
      </div>

      <div className='card-body mt-3'>
        <div className='row'>
          <div className='col-md-8'>
            <h3>Attraction Information</h3>
            <table className='table'>
              <tbody>
                <tr>
                  <th>ID:</th>
                  <td>{attraction[0].attraction_id}</td>
                </tr>
                <tr>
                  <th>Name:</th>
                  <td>{attraction[0].name}</td>
                </tr>
                <tr>
                  <th>Description:</th>
                  <td>{attraction[0].description}</td>
                </tr>
                <tr>
                  <th>Address:</th>
                  <td>{attraction[0].address}</td>
                </tr>
                <tr>
                  <th>Postal Code:</th>
                  <td>{attraction[0].postal_code}</td>
                </tr>
                <tr>
                  <th>City:</th>
                  <td>{attraction[0].city}</td>
                </tr>
                <tr>
                  <th>Country:</th>
                  <td>{attraction[0].country}</td>
                </tr>
                <tr>
                  <th>Email:</th>
                  <td>{attraction[0].email}</td>
                </tr>
                <tr>
                  <th>Phone:</th>
                  <td>{attraction[0].phone}</td>
                </tr>
                <tr>
                  <th>Is Closed:</th>
                  <td>{attraction[0].is_closed ? 'Yes' : 'No'}</td>
                </tr>
                <tr>
                  <th>Website:</th>
                  <td>{attraction[0].website}</td>
                </tr>
                <tr>
                  <th>Category:</th>
                  <td>{attraction[0].category}</td>
                </tr>
                <tr>
                  <th>Longitude:</th>
                  <td>{attraction[0].longitude}</td>
                </tr>
                <tr>
                  <th>Latitude:</th>
                  <td>{attraction[0].latitude}</td>
                </tr>
                <tr>
                  <th>Created At:</th>
                  <td>{new Date(attraction[0].created_at).toLocaleDateString()}</td>
                </tr>
                <tr>
                  <th>Updated At:</th>
                  <td>{new Date(attraction[0].updated_at).toLocaleDateString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}