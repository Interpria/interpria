import {fetchLanguage} from '@/app/lib/language';
import CreateLanguageForm from './CreateLanguageForm';
import UpdateLanguageForm from './UpdateLanguageForm';
import DeleteLanguageButton from './DeleteLanguageButton';

export default async function LanguagePage() {
  const languages = await fetchLanguage();
  return (  
    <div className='d-flex flex-column align-items-center justify-content-center gap-3 p-5 m-5'>
      <h1>Manage Language</h1>

      <div className="w-100 mb-4">
        <CreateLanguageForm />
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">language_id</th>
            <th scope="col">code</th>
            <th scope="col">name</th>
            <th scope="col">actions</th>
          </tr>
        </thead>
        <tbody>
          {languages.map((language) => (
            <tr key={language.language_id}>
              <th scope="row">{language.language_id}</th>
              <td>{language.code}</td>
              <td>{language.name}</td>
              <td>
                <div className="d-flex gap-2">
                  <UpdateLanguageForm language={language} />
                  <DeleteLanguageButton languageId={language.language_id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}