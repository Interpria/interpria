import {fetchUser} from '@/app/lib/data';

export default async function UserPage() {
  const users = await fetchUser();
  return (  
    <div className='d-flex flex-column align-items-center justify-content-center gap-3 p-5 m-5'>
      <h1>Manage User</h1>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">user_id</th>
            <th scope="col">email</th>
            <th scope="col">name</th>
            <th scope="col">role</th>
            <th scope="col">phone_num</th>
            <th scope="col">created_at</th>
            <th scope="col">updated_at</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user_id}>
              <th scope="row">{user.user_id}</th>
              <td>{user.email}</td>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>{user.phone_num}</td>
              <td>{new Date(user.created_at).toLocaleDateString()}</td>
              <td>{new Date(user.updated_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}