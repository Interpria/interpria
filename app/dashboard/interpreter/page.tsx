import {fetchInterpreter} from '@/app/lib/data';
import Link from 'next/link';

export default async function InterpreterPage() {
  const interpreters = await fetchInterpreter();
  return (  
    <div className='d-flex flex-column align-items-center justify-content-center gap-3 p-5 m-5'>
      <h1>Manage Interpreter</h1>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">interpreter_id</th>
            <th scope="col">user_id</th>
            <th scope="col">name</th>
            <th scope="col">gender</th>
            <th scope="col">languages</th>
            <th scope="col">actions</th>
          </tr>
        </thead>
        <tbody>
          {interpreters.map((interpreter) => (
            <tr key={interpreter.interpreter_id}>
              <th scope="row">{interpreter.interpreter_id}</th>
              <td>{interpreter.user_id}</td>
              <td>{interpreter.name}</td>
              <td>{interpreter.gender}</td>
              <td>{interpreter.primary_language}
                {interpreter.languages && (
                  <>,{interpreter.languages}</>
                )}
              </td>
              <td>
                <div className="d-flex gap-2">
                  <Link href={`/dashboard/interpreter/${interpreter.interpreter_id}`} className="btn btn-primary">Details</Link>
                  <button className="btn btn-warning">Edit</button>
                  <button className="btn btn-danger">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}