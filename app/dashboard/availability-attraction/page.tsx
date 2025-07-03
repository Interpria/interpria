import {fetchAvailabilityAttraction} from '@/app/lib/availability-attraction';

export default async function AvailabilityAttractionPage() {
  const availabilityAttractions = await fetchAvailabilityAttraction();
    return (  
      <>
        <div className='d-flex flex-column align-items-center justify-content-center gap-3 p-5 m-5'>
          <h1>Manage Attraction Availability</h1>

          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">availability_id</th>
                <th scope="col">attraction_id</th>
                <th scope="col">weekday</th>
                <th scope="col">start_time</th>
                <th scope="col">end_time</th>
                {/* <th scope="col">actions</th> */}
              </tr>
            </thead>
            <tbody>
              {availabilityAttractions.map((availabilityAttraction) => (
                <tr key={availabilityAttraction.availability_id}>
                  <th scope="row">{availabilityAttraction.availability_id}</th>
                  <td>{availabilityAttraction.attraction_id}</td>
                  <td>{availabilityAttraction.weekday}</td>
                  <td>{availabilityAttraction.start_time}</td>
                  <td>{availabilityAttraction.end_time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }