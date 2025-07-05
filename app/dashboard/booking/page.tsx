import { fetchBooking } from '@/app/lib/booking';

export default async function BookingPage() {
  const bookings = await fetchBooking();

  return (  
    <>
      <div className='d-flex flex-column align-items-center justify-content-center gap-3 p-5 m-5'>
        <h1>Manage Booking</h1>

        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">User</th>
              <th scope="col">Interpreter</th>
              <th scope="col">Attraction</th>
              <th scope="col">Start Time</th>
              <th scope="col">End Time</th>
              <th scope="col">Language</th>
              <th scope="col">People</th>
              <th scope="col">Price</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.booking_id}>
                <th scope="row">{booking.booking_id}</th>
                <td>{booking.user_name}</td>
                <td>{booking.interpreter_name}</td>
                <td>{booking.attraction_name}</td>
                <td>{(booking.start_time).toString()}</td>
                <td>{(booking.end_time).toString()}</td>
                <td>{booking.language_name}</td>
                <td>{booking.num_people}</td>
                <td>{booking.price}</td>
                <td>{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}