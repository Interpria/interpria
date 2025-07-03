import { fetchInterpreter } from '@/app/lib/interpreter';
import Link from 'next/link';
import DeleteInterpreterButton from './DeleteInterpreterButton';

export default async function InterpreterPage() {
  const interpreters = await fetchInterpreter();
  return (  
    <div className='container py-5'>
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <h1>Manage Interpreter</h1>
        <Link href="/dashboard/interpreter/create" className='btn btn-success'>
          Create New Interpreter
        </Link>
      </div>

      <div className='card'>
        <div className='card-body'>
          <div className='table-responsive'>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">User ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Languages</th>
                  <th scope="col">Actions</th>
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
                      {interpreter.languages && (',' + interpreter.languages)}
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <Link href={`/dashboard/interpreter/${interpreter.interpreter_id}`} className="btn btn-primary">Details</Link>
                        {/* <Link href={`/dashboard/interpreter/${interpreter.interpreter_id}/edit`} className="btn btn-warning">Edit</Link> */}
                        <DeleteInterpreterButton id={interpreter.interpreter_id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}