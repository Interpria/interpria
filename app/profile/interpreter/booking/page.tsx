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
  const [confirmingId, setConfirmingId] = useState<number | null>(null);

  const formatDateTime = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleString();
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
    setConfirmingId(bookingId);
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
    } finally {
      setConfirmingId(null);
    }
  };

  if (isLoading) return <div className="container py-5">Loading...</div>;
  if (!interpreter) return <div className="container py-5">User not found.</div>;

  // Separate bookings
  const now = new Date();
  const pendingBookings = bookings.filter((b) => b.status === 'pending');
  const upcomingBookings = bookings.filter(
    (b) => b.status !== 'pending' && new Date(b.start_time) >= now
  );
  const pastBookings = bookings.filter(
    (b) => b.status !== 'pending' && new Date(b.start_time) < now
  );

  const BookingCard = ({ booking, showConfirm }: { booking: any; showConfirm?: boolean }) => (
    <div className="col-md-4 mb-3">
      <div className="card h-100">
        <div className="card-body">
          <h5 className="card-title">{booking.attraction_name}</h5>
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
              className="btn btn-success mt-3"
              disabled={confirmingId === booking.booking_id}
              onClick={() => handleConfirm(booking.booking_id)}
            >
              {confirmingId === booking.booking_id ? 'Confirming...' : 'Confirm'}
            </button>
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
                <BookingCard booking={booking} key={booking.booking_id} showConfirm />
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
                <Link
                  href={`/profile/booking/${booking.booking_id}`}
                  className="text-decoration-none text-dark"
                  style={{ display: 'flex' }}
                >
                  <BookingCard booking={booking} key={booking.booking_id} />
                </Link>
              ))
            ) : (
              <div className="col-12">
                <p className="text-muted mb-0">No upcoming bookings found</p>
              </div>
            )}
          </div>
        </div>
        {/* Past Bookings Section */}
        <div>
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
      </div>
    </div>
  );
}