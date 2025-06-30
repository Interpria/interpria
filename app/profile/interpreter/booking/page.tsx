'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Interpreter } from '@/app/lib/definitions';
import { fetchCurrentInterpreterId } from '@/app/components/currentInterpreter';

export default function InterpreterBookingPage() {
  const [interpreter, setInterpreter] = useState<Interpreter | null>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formatDateTime = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    // Format: YYYY-MM-DD HH:mm
    return `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2,'0')}-${date.getDate().toString().padStart(2,'0')} ${date.getHours().toString().padStart(2,'0')}:${date.getMinutes().toString().padStart(2,'0')}`;
  };

  useEffect(() => {
    const getInterpreter = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const interpreterId = await fetchCurrentInterpreterId();
        if (!interpreterId) {
          setError('Interpreter not found.');
          setIsLoading(false);
          return;
        }
        const response = await fetch(`/api/interpreter/${interpreterId}`);
        if (!response.ok) {
          setError('Failed to fetch interpreter data');
          setIsLoading(false);
          return;
        }
        const data = await response.json();
        setInterpreter(Array.isArray(data) ? data[0] : data);
      } catch (err) {
        setError('Failed to load interpreter data');
      } finally {
        setIsLoading(false);
      }
    };
    getInterpreter();
  }, []);

  // fetch interpreter bookings
  useEffect(() => {
    const fetchBookings = async () => {
      if (interpreter && interpreter.interpreter_id) {
        try {
          const res = await fetch(`/api/booking/interpreter/${interpreter.interpreter_id}`);
          if (res.ok) {
            const data = await res.json();
            setBookings(data);
          } else {
            setBookings([]);
          }
        } catch (err) {
          setBookings([]);
        }
      }
    };
    fetchBookings();
  }, [interpreter]);

  const handleConfirm = async (bookingId: number) => {
    try {
      const res = await fetch(`/api/booking/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'confirmed' }),
      });
      if (res.ok) {
        // Refresh bookings after confirmation
        setBookings((prev) =>
          prev.map((b) =>
            b.booking_id === bookingId ? { ...b, status: 'confirmed' } : b
          )
        );
      }
    } catch (err) {
      // Optionally show error
    }
  };

  const handleCancelBooking = async (bookingId: number) => {
    try {
      const res = await fetch(`/api/booking/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'cancelled' }),
      });
      if (res.ok) {
        setBookings((prev) => prev.map(b => b.booking_id === bookingId ? { ...b, status: 'cancelled' } : b));
      }
    } catch (err) {
      // Optionally show error
    }
  };

  if (isLoading) return <div className="container py-5">Loading...</div>;
  if (!interpreter) return <div className="container py-5">User not found.</div>;

  // Separate bookings
  const now = new Date();
  const pendingBookings = bookings.filter((b) => b.status === 'pending');
  const upcomingBookings = bookings.filter(
    (b) => b.status === 'confirmed' && new Date(b.start_time) >= now
  );
  const pastBookings = bookings.filter(
    (b) => (b.status === 'confirmed' || b.status === 'rated') && new Date(b.start_time) < now
  );
  const cancelledBookings = bookings.filter((b) => b.status === 'cancelled');

  const BookingCard = ({ booking, showConfirm, showCancel }: { booking: any; showConfirm?: boolean; showCancel?: boolean }) => (
    <div className="col-md-4 mb-3">
      <div className="card h-100">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className="card-title mb-0">{booking.attraction_name}</h5>
            <Link href={`/profile/interpreter/booking/${booking.booking_id}`} className="btn btn-outline-primary btn-sm ms-2">
              Detail
            </Link>
          </div>
          <h6 className="card-subtitle mb-2 text-muted">
            Participant: {booking.user_name}
          </h6>
          <div>
            <strong>Start:</strong> {formatDateTime(booking.start_time)}
          </div>
          <div>
            <strong>End:</strong> {formatDateTime(booking.end_time)}
          </div>
          {showConfirm && (
            <button
              className="btn btn-success btn-sm mt-2 me-2"
              onClick={() => handleConfirm(booking.booking_id)}
            >
              Accept
            </button>
          )}
          {showCancel && (
            <button className="btn btn-danger btn-sm mt-2" onClick={() => handleCancelBooking(booking.booking_id)}>
              Cancel
            </button>
          )}
          {booking.rating != null && (
            <span className="badge bg-info mt-2 ms-2">Rated {booking.rating}</span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container py-5">
      <div className="mb-4"></div>
      <div className="card">
        <div className="card-header">
          <h1 className="card-title mb-0">Interpreter Bookings</h1>
        </div>
      </div>
      <div className="card-body mt-3">
        {/* Pending Bookings Section */}
        <div className="mb-5">
          <h3 className="mb-0">Pending Bookings</h3>
          <span className="badge bg-warning text-dark mb-2">
            {pendingBookings.length} Booking{pendingBookings.length !== 1 ? 's' : ''}
          </span>
          <div className="row">
            {pendingBookings.length > 0 ? (
              pendingBookings.map((booking) => (
                <BookingCard booking={booking} key={booking.booking_id} showConfirm showCancel />
              ))
            ) : (
              <div className="col-12">
                <p className="text-muted mb-0">No pending bookings found</p>
              </div>
            )}
          </div>
        </div>
        {/* Upcoming Bookings Section */}
        <div className="mb-5">
          <h3 className="mb-0">Upcoming Bookings</h3>
          <span className="badge bg-primary mb-2">
            {upcomingBookings.length} Booking{upcomingBookings.length !== 1 ? 's' : ''}
          </span>
          <div className="row">
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map((booking) => (
                <BookingCard booking={booking} key={booking.booking_id} showCancel />
              ))
            ) : (
              <div className="col-12">
                <p className="text-muted mb-0">No upcoming bookings found</p>
              </div>
            )}
          </div>
        </div>
        {/* Past Bookings Section */}
        <div className="mb-5">
          <h3 className="mb-0">Past Bookings</h3>
          <span className="badge bg-secondary mb-2">
            {pastBookings.length} Booking{pastBookings.length !== 1 ? 's' : ''}
          </span>
          <div className="row">
            {pastBookings.length > 0 ? (
              pastBookings.map((booking) => (
                <BookingCard booking={booking} key={booking.booking_id} />
              ))
            ) : (
              <div className="col-12">
                <p className="text-muted mb-0">No past bookings found</p>
              </div>
            )}
          </div>
        </div>
        <div className="mb-5">
          <h3 className="mb-0">Cancelled Bookings</h3>
          <span className="badge bg-danger mb-2">
            {cancelledBookings.length} Booking{cancelledBookings.length !== 1 ? 's' : ''}
          </span>
          <div className="row">
            {cancelledBookings.length > 0 ? (
              cancelledBookings.map((booking) => (
                <BookingCard key={booking.booking_id} booking={booking} />
              ))
            ) : (
              <p className="text-muted mb-0">No cancelled bookings found</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}