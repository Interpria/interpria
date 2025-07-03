import {fetchInterpreterxlanguage} from '@/app/lib/interpreterxlanguage';

export default async function InterpreterLanguagePage() {
  const interpreterLanguages = await fetchInterpreterxlanguage();
  return (  
    <div className='d-flex flex-column align-items-center justify-content-center gap-3 p-5 m-5'>
      <h1>Manage Interpreter x Language</h1>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">interpreterxlanguage_id</th>
            <th scope="col">interpreter_id</th>
            <th scope="col">language_id</th>
          </tr>
        </thead>
        <tbody>
          {interpreterLanguages.map((interpreterLanguage) => (
            <tr key={interpreterLanguage.interpreterxlanguage_id}>
              <th scope="row">{interpreterLanguage.interpreterxlanguage_id}</th>
              <td>{interpreterLanguage.interpreter_id}</td>
              <td>{interpreterLanguage.language_id}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}