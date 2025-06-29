import { fetchBooking } from '@/app/api/booking/route';

export default async function BookingPage() {
  const bookings = await fetchBooking();

  const formatDateTime = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleString();
  };

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
                <td>{formatDateTime(booking.start_time)}</td>
                <td>{formatDateTime(booking.end_time)}</td>
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