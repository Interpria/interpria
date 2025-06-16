import {fetchInterpreterxattraction} from '@/app/api/interpreterxattraction/route';

export default async function InterpreterAttractionPage() {
  const interpreterAttractions = await fetchInterpreterxattraction();
    return (  
      <>
        <div className='d-flex flex-column align-items-center justify-content-center gap-3 p-5 m-5'>
            <h1>Manage Interpreter x Attraction</h1>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">interpreterxattraction_id</th>
                        <th scope="col">interpreter_id</th>
                        <th scope="col">attraction_id</th>
                        <th scope="col">duration</th>
                        <th scope="col">buffer_time</th>
                        <th scope="col">max_traveler</th>
                        <th scope="col">price</th>
                    </tr>
                </thead>
                <tbody>
                    {interpreterAttractions.map((interpreterAttraction) => (
                        <tr key={interpreterAttraction.interpreterxattraction_id}>
                          <th scope="row">{interpreterAttraction.interpreterxattraction_id}</th>
                          <td>{interpreterAttraction.interpreter_id}</td>
                          <td>{interpreterAttraction.attraction_id}</td>
                          <td>{interpreterAttraction.duration}</td>
                          <td>{interpreterAttraction.buffer_time}</td>
                          <td>{interpreterAttraction.max_traveler}</td>
                          <td>{interpreterAttraction.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </>
    );
}