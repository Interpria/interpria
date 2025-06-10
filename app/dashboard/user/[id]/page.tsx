import { fetchUserById } from '@/app/lib/data';
import Link from 'next/link';

export default async function UserDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const user = await fetchUserById(parseInt(id));
  return (
    <div className='container py-5'>
      <div className='mb-4'>
        <Link href="/dashboard/user" className='btn btn-secondary'>
          ← Back to User List
        </Link>
      </div>

      <div className='card'>
        <div className='card-header'>
          <h1 className='card-title mb-0'>{user[0].name}</h1>
        </div>
      </div>

      <div className='card-body mt-3'>
        <div className='row'>
          <div className='col-md-6'>
            <h3>User Personal Information</h3>
            <table className='table'>
              <tbody>
                <tr>
                  <th>Name:</th>
                  <td>{user[0].name}</td>
                </tr>
                <tr>
                  <th>Email:</th>
                  <td>{user[0].email}</td>
                </tr>
                <tr>
                  <th>Role:</th>
                  <td>{user[0].role}</td>
                </tr>
                <tr>
                  <th>Phone Number:</th>
                  <td>{user[0].phone_num}</td>
                </tr>
                <tr>
                  <th>Created At:</th>
                  <td>{new Date(user[0].created_at).toLocaleDateString()}</td>
                </tr>
                <tr>
                  <th>Updated At:</th>
                  <td>{new Date(user[0].updated_at).toLocaleDateString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}