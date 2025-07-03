import { fetchUserById } from '@/app/lib/user';
import { fetchBookingsByUserId } from '@/app/lib/booking';
import Link from 'next/link';
import CreateBookingForm from './CreateBookingForm';
import DeleteBookingButton from './DeleteBookingButton';

export default async function UserDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const userId = parseInt(id);
  const [user, bookings] = await Promise.all([
    fetchUserById(userId),
    fetchBookingsByUserId(userId)
  ]);

  const formatDateTime = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleString();
  };

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
                  <td>{user[0].phone}</td>
                </tr>
                <tr>
                  <th>Created At:</th>
                  <td>{new Date(user[0].created_at).toLocaleDateString()}</td>
                </tr>
                <tr>
                  <th>Updated At:</th>
                  <td>{new Date(user[0].updated_at).toLocaleDateString()}</td>
                </tr>
                <tr>
                  <th>Interpreter ID:</th>
                  <td>{user[0].interpreter_id ? <Link href={`/dashboard/interpreter/${user[0].interpreter_id}`}>{user[0].interpreter_id}</Link> : 'Not registered as interpreter'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className='row mt-4'>
          <div className='col-12'>
            <div className='d-flex justify-content-between align-items-center mb-3'>
              <h3 className='mb-0'>User Bookings</h3>
              <span className='badge bg-primary'>{bookings.length} Bookings</span>
            </div>

            {bookings.length > 0 ? (
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Interpreter</th>
                    <th scope="col">Attraction</th>
                    <th scope="col">Start Time</th>
                    <th scope="col">End Time</th>
                    <th scope="col">Language</th>
                    <th scope="col">People</th>
                    <th scope="col">Price</th>
                    <th scope="col">Status</th>
                    <th scope="col">Rating</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.booking_id}>
                      <td>{booking.interpreter_name}</td>
                      <td>{booking.attraction_name}</td>
                      <td>{formatDateTime(booking.start_time)}</td>
                      <td>{formatDateTime(booking.end_time)}</td>
                      <td>{booking.language_name}</td>
                      <td>{booking.num_people}</td>
                      <td>{booking.price}</td>
                      <td>{booking.status}</td>
                      <td>{booking.rating !== null ? booking.rating : 'Not rated'}</td>
                      <td>
                        <DeleteBookingButton bookingId={booking.booking_id} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className='text-muted mb-0'>No bookings found for this user</p>
            )}
          </div>
        </div>

        <CreateBookingForm userId={userId} userName={user[0].name} />
      </div>
    </div>
  );
}