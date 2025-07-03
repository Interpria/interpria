import { fetchAvailabilityInterpreter } from '@/app/lib/availability-interpreter';

export default async function AvailabilityInterpreterPage() {
  const availabilityInterpreters = await fetchAvailabilityInterpreter();
  
    return (  
      <>
        <div className='d-flex flex-column align-items-center justify-content-center gap-3 p-5 m-5'>
            <h1>Manage Interpreter Availability</h1>

            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">availability_id</th>
                  <th scope="col">interpreter_id</th>
                  <th scope="col">attraction_id</th>
                  <th scope="col">weekday</th>
                  <th scope="col">start_time</th>
                  <th scope="col">end_time</th>
                  {/* <th scope="col">date</th> */}
                </tr>
              </thead>
              <tbody>
                {availabilityInterpreters.map((availabilityInterpreter) => (
                  <tr key={availabilityInterpreter.availability_id}>
                    <th scope="row">{availabilityInterpreter.availability_id}</th>
                    <td>{availabilityInterpreter.interpreter_id}</td>
                    <td>{availabilityInterpreter.attraction_id}</td>
                    <td>{availabilityInterpreter.weekday}</td>
                    <td>{availabilityInterpreter.start_time}</td>
                    <td>{availabilityInterpreter.end_time}</td>
                    {/* <td>{availabilityInterpreter.date.toLocaleDateString()}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      </>
    );
  }