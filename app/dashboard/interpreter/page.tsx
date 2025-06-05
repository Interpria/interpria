import {fetchInterpreter} from '@/app/lib/data';

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
            <th scope="col">gender</th>
            <th scope="col">primary_language_id</th>
          </tr>
        </thead>
        <tbody>
          {interpreters.map((interpreter) => (
            <tr key={interpreter.interpreter_id}>
              <th scope="row">{interpreter.interpreter_id}</th>
              <td>{interpreter.user_id}</td>
              <td>{interpreter.gender}</td>
              <td>{interpreter.primary_language_id}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}