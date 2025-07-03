import { fetchUser } from '@/app/lib/user';
import Link from 'next/link';
import CreateUserForm from './CreateUserForm';
import UpdateUserForm from './UpdateUserForm';
import DeleteUserButton from './DeleteUserButton';
import React from 'react';

export default async function UserPage() {
  const users = await fetchUser();
  return (  
    <div className='d-flex flex-column align-items-center justify-content-center gap-3 p-5 m-5'>
      <h1>Manage User</h1>

      <div className="w-100 mb-4">
        <CreateUserForm />
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">user_id</th>
            <th scope="col">email</th>
            <th scope="col">name</th>
            <th scope="col">role</th>
            <th scope="col">phone</th>
            <th scope="col">created_at</th>
            <th scope="col">updated_at</th>
            <th scope="col">actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <React.Fragment key={user.user_id}>
              <tr>
                <th scope="row">{user.user_id}</th>
                <td>{user.email}</td>
                <td>{user.name}</td>  
                <td>{user.role}</td>
                <td>{user.phone}</td>
                <td>{new Date(user.created_at).toLocaleDateString()}</td>
                <td>{new Date(user.updated_at).toLocaleDateString()}</td>
                <td>
                  <div className="d-flex gap-2">
                    <Link href={`/dashboard/user/${user.user_id}`} className="btn btn-primary">Details</Link>
                    <UpdateUserForm user={user} />
                    <DeleteUserButton userId={user.user_id} />
                  </div>
                </td>
              </tr>

              <tr id={`edit-row-${user.user_id}`} className="d-none">
                <td colSpan={8}>
                  <div className="p-3 bg-light">
                    <UpdateUserForm user={user} isExpanded={true} />
                  </div>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}