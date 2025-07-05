'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Booking, User } from '@/app/lib/definitions';
import { fetchCurrentUserId } from '@/app/components/CurrentUser';

export default function UserBookingPage() {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [ratingModal, setRatingModal] = useState<{ open: boolean, bookingId: number | null }>({ open: false, bookingId: null });
  const [ratingValue, setRatingValue] = useState<number>(5);
  const [ratingLoading, setRatingLoading] = useState(false);
  const [ratingError, setRatingError] = useState<string | null>(null);
  const [ratingSuccess, setRatingSuccess] = useState<string | null>(null);

  const formatDateTime = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleString();
  };

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      setUser(null);
      try {
        const userId = await fetchCurrentUserId();
        console.log('Current user ID:', userId);
        const userRes = await fetch(`/api/user/${userId}`);
        const userData = await userRes.json();
        setUser(Array.isArray(userData) ? userData[0] : userData);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      if (user && user.user_id) {
        try {
          const res = await fetch(`/api/booking/user/${user.user_id}`);
          if (res.ok) {
            const data = await res.json();
            console.log('Fetched bookings:', data);
            setBookings(data);
          } else {
            setBookings([]);
          }
        } catch {
          setBookings([]);
        }
      }
    };
    fetchBookings();
  }, [user]);

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
    } catch {
      // Optionally show error
    }
  };

  const handleOpenRating = (bookingId: number) => {
    setRatingModal({ open: true, bookingId });
    setRatingValue(5);
    setRatingError(null);
    setRatingSuccess(null);
  };

  const handleSubmitRating = async () => {
    if (!ratingModal.bookingId) return;
    setRatingLoading(true);
    setRatingError(null);
    setRatingSuccess(null);
    try {
      const res = await fetch(`/api/booking/${ratingModal.bookingId}/rate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating: ratingValue }),
      });
      if (!res.ok) throw new Error('Failed to submit rating');
      setRatingSuccess('Thank you for your rating!');
      setBookings((prev) => prev.map(b => b.booking_id === ratingModal.bookingId ? { ...b, rated: true, rating: ratingValue } : b));
      setTimeout(() => setRatingModal({ open: false, bookingId: null }), 1200);
    } catch {
      setRatingError('Failed to submit rating');
    } finally {
      setRatingLoading(false);
    }
  };

  if (loading) return <div className="container py-5">Loading...</div>;
  if (!user) return <div className="container py-5">User not found.</div>;

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

  const BookingCard = ({ booking, showCancel, showRate }: { booking: Booking, showCancel?: boolean, showRate?: boolean }) => (
    <div className="col-md-4 mb-3">
      <div className="card h-100">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className="card-title mb-0">{booking.attraction_name}</h5>
            <Link href={`/profile/user/booking/${booking.booking_id}`} className="btn btn-outline-primary btn-sm ms-2">
              Detail
            </Link>
          </div>
          <h6 className="card-subtitle mb-2 text-muted">
            Interpreter: {booking.interpreter_name}
          </h6>
          <div>
            <strong>Start:</strong> {formatDateTime(booking.start_time)}
          </div>
          <div>
            <strong>End:</strong> {formatDateTime(booking.end_time)}
          </div>
          {showCancel && (
            <button className="btn btn-danger btn-sm mt-2" onClick={() => handleCancelBooking(booking.booking_id)}>
              Cancel
            </button>
          )}
          {showRate && booking.rating == null && (
            <button className="btn btn-warning btn-sm mt-2 ms-2" onClick={() => handleOpenRating(booking.booking_id)}>
              Rate
            </button>
          )}
          {showRate && booking.rating != null && (
            <span className="badge bg-info mt-2 ms-2">Rated {booking.rating ?? ratingValue}</span>
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
          <h1 className="card-title mb-0">Bookings</h1>
        </div>
      </div>
      <div className="card-body mt-3">
        <div className="mb-5">
          <h3 className="mb-0">Pending Bookings</h3>
          <span className="badge bg-warning mb-2">
            {pendingBookings.length} Booking{pendingBookings.length !== 1 ? 's' : ''}
          </span>
          <div className="row">
            {pendingBookings.length > 0 ? (
              pendingBookings.map((booking) => (
                <BookingCard key={booking.booking_id} booking={booking} showCancel />
              ))
            ) : (
              <p className="text-muted mb-0">No pending bookings found</p>
            )}
          </div>
        </div>

        <div className="mb-5">
          <h3 className="mb-0">Upcoming Bookings</h3>
          <span className="badge bg-primary mb-2">
            {upcomingBookings.length} Booking{upcomingBookings.length !== 1 ? 's' : ''}
          </span>
          <div className="row">            
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map((booking) => (
                <Link
                  href={`/profile/user/booking/${booking.booking_id}`}
                  className="text-decoration-none text-dark"
                  key={booking.booking_id}
                >
                  <BookingCard booking={booking} showCancel />
                </Link>
              ))
            ) : (
              <p className="text-muted mb-0">No upcoming bookings found</p>
            )}
          </div>
        </div>

        <div className="mb-5">
          <h3 className="mb-0">Past Bookings</h3>
          <span className="badge bg-secondary mb-2">
            {pastBookings.length} Booking{pastBookings.length !== 1 ? 's' : ''}
          </span>
          <div className="row">
            {pastBookings.length > 0 ? (
              pastBookings.map((booking) => (
                <BookingCard key={booking.booking_id} booking={booking} showRate />
              ))
            ) : (
              <p className="text-muted mb-0">No past bookings found</p>
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

      {/* Rating Modal */}
      {ratingModal.open && (
        <div className="modal fade show d-block" tabIndex={-1} style={{ background: 'rgba(0,0,0,0.3)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Rate Your Interpreter</h5>
                <button type="button" className="btn-close" onClick={() => setRatingModal({ open: false, bookingId: null })}></button>
              </div>
              <div className="modal-body">
                <label htmlFor="rating" className="form-label">Rating (1-5):</label>
                <input
                  id="rating"
                  type="number"
                  min={1}
                  max={5}
                  value={ratingValue}
                  onChange={e => setRatingValue(Number(e.target.value))}
                  className="form-control mb-2"
                  disabled={ratingLoading}
                />
                {ratingError && <div className="text-danger mb-2">{ratingError}</div>}
                {ratingSuccess && <div className="text-success mb-2">{ratingSuccess}</div>}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setRatingModal({ open: false, bookingId: null })} disabled={ratingLoading}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleSubmitRating} disabled={ratingLoading}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}