import {fetchAttraction} from '@/app/api/attraction/route';
import Link from 'next/link';
import DeleteAttractionButton from './DeleteAttractionButton';

export default async function AttractionPage() {
  const attractions = await fetchAttraction();
  return (  
    <div className='d-flex flex-column align-items-center justify-content-center gap-3 p-5 m-5'>
      <div className="d-flex justify-content-between align-items-center w-100 mb-4">
        <h1>Manage Attraction</h1>
        <Link href="/dashboard/attraction/add" className="btn btn-success">
          Create New Attraction
        </Link>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">name</th>
            <th scope="col">city</th>
            <th scope="col">country</th>
            <th scope="col">is_closed</th>
            <th scope="col">category</th>
            <th scope="col">actions</th>
          </tr>
        </thead>
        <tbody>
          {attractions.map((attraction) => (
            <tr key={attraction.attraction_id}>
              <th scope="row">{attraction.attraction_id}</th>
              <td>{attraction.name}</td>
              <td>{attraction.city}</td>
              <td>{attraction.country}</td>
              <td>{attraction.is_closed ? 'Yes' : 'No'}</td>
              <td>{attraction.category}</td>
              <td>
                <div className="d-flex gap-2">
                  <Link href={`/dashboard/attraction/${attraction.attraction_id}`} className="btn btn-primary">Details</Link>
                  {/* <Link href={`/dashboard/attraction/${attraction.attraction_id}/edit`} className="btn btn-warning">Edit</Link> */}
                  <DeleteAttractionButton attractionId={attraction.attraction_id} onMainPage={true} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}