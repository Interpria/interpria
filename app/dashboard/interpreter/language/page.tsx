import {fetchLanguage} from '@/app/lib/data';

export default async function LanguagePage() {
  const languages = await fetchLanguage();
  return (  
    <div className='d-flex flex-column align-items-center justify-content-center gap-3 p-5 m-5'>
      <h1>Manage Language</h1>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">language_id</th>
            <th scope="col">code</th>
            <th scope="col">name</th>
          </tr>
        </thead>
        <tbody>
          {languages.map((language) => (
            <tr key={language.language_id}>
              <th scope="row">{language.language_id}</th>
              <td>{language.code}</td>
              <td>{language.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}