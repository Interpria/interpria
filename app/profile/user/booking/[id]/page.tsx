'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function BookingDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const formatDateTime = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleString();
  };

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await fetch(`/api/booking/${id}`);
        if (res.ok) {
          const data = await res.json();
          setBooking(Array.isArray(data) ? data[0] : data);
        } else {
          setBooking(null);
        }
      } catch {
        setBooking(null);
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [id]);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/booking/${id}`, { method: 'DELETE' });
      if (res.ok) {
        router.push('/profile/booking');
      } else {
        alert('Failed to cancel booking.');
      }
    } catch {
      alert('Failed to cancel booking.');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <div className="container py-5">Loading...</div>;
  if (!booking) return <div className="container py-5">Booking not found.</div>;

  return (
    <div className='container py-5'>
      <div className="mb-3 d-flex gap-2">
        <button
          className="btn btn-secondary"
          onClick={() => router.push('/profile/user/booking')}
        >
          ← Back to Bookings
        </button>
      </div>
      <h1 className='mb-4'>Booking Details</h1>
      <table className="table table-striped w-auto">
        <tbody>
          <tr>
            <th>ID</th>
            <td>{booking.booking_id}</td>
          </tr>
          <tr>
            <th>User</th>
            <td>{booking.user_name}</td>
          </tr>
          <tr>
            <th>Interpreter</th>
            <td>{booking.interpreter_name}</td>
          </tr>
          <tr>
            <th>Attraction</th>
            <td>{booking.attraction_name}</td>
          </tr>
          <tr>
            <th>Start Time</th>
            <td>{formatDateTime(booking.start_time)}</td>
          </tr>
          <tr>
            <th>End Time</th>
            <td>{formatDateTime(booking.end_time)}</td>
          </tr>
          <tr>
            <th>Language</th>
            <td>{booking.language_name}</td>
          </tr>
          <tr>
            <th>People</th>
            <td>{booking.num_people}</td>
          </tr>
          <tr>
            <th>Price</th>
            <td>{booking.price}</td>
          </tr>
          <tr>
            <th>Status</th>
            <td>{booking.status}</td>
          </tr>
        </tbody>
    </table>
        <div className="mt-4">    
            <button
                className="btn btn-danger"
                onClick={handleDelete}
                disabled={deleting}
            >
                {deleting ? 'Cancelling...' : 'Cancel Booking'}
            </button>
        </div>
    </div>
  );
}