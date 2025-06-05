import { fetchBooking } from '@/app/lib/data';

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
              <th scope="col">booking_id</th>
              <th scope="col">traveler_id</th>
              <th scope="col">interpreter_id</th>
              <th scope="col">attraction_id</th>
              <th scope="col">start_time</th>
              <th scope="col">end_time</th>
              <th scope="col">language_id</th>
              <th scope="col">num_traveler</th>
              <th scope="col">price</th>
              <th scope="col">status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.booking_id}>
                <th scope="row">{booking.booking_id}</th>
                <td>{booking.traveler_id}</td>
                <td>{booking.interpreter_id}</td>
                <td>{booking.attraction_id}</td>
                <td>{formatDateTime(booking.start_time)}</td>
                <td>{formatDateTime(booking.end_time)}</td>
                <td>{booking.language_id}</td>
                <td>{booking.num_traveler}</td>
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