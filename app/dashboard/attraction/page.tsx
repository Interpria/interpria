import {fetchAttraction} from '@/app/lib/data';
import Link from 'next/link';

export default async function AttractionPage() {
  const attractions = await fetchAttraction();
  return (  
    <div className='d-flex flex-column align-items-center justify-content-center gap-3 p-5 m-5'>
      <h1>Manage Attraction</h1>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">attraction_id</th>
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
                <Link href={`/dashboard/attraction/${attraction.attraction_id}`} className="btn btn-primary mx-1">Details</Link>
                <button className="btn btn-warning mx-1">Edit</button>
                <button className="btn btn-danger mx-1">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}