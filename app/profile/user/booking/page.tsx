'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function UserBookingPage() {
  const [user, setUser] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const formatDateTime = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleString();
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await fetch('/api/auth/login');
        if (res.ok) {
          const data = await res.json();
          if (data && data.user && data.user.userId) {
            const userRes = await fetch(`/api/user/${data.user.userId}`);
            const userData = await userRes.json();
            setUser(userData && Array.isArray(userData) ? userData[0] : userData);
          } else {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentUser();
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
        } catch (err) {
          setBookings([]);
        }
      }
    };
    fetchBookings();
  }, [user]);

  if (loading) return <div className="container py-5">Loading...</div>;
  if (!user) return <div className="container py-5">User not found.</div>;

  // Separate bookings
  const now = new Date();
  const pendingBookings = bookings.filter((b) => b.status === 'pending');
  const upcomingBookings = bookings.filter(
    (b) => b.status !== 'pending' && new Date(b.start_time) >= now
  );
  const pastBookings = bookings.filter(
    (b) => b.status !== 'pending' && new Date(b.start_time) < now
  );

  const BookingCard = ({ booking }: { booking: any }) => (
    <div className="col-md-4 mb-3">
      <div className="card h-100">
        <div className="card-body">
          <h5 className="card-title">{booking.attraction_name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            Interpreter: {booking.interpreter_name}
          </h6>
          <div>
            <strong>Start:</strong> {formatDateTime(booking.start_time)}
          </div>
          <div>
            <strong>End:</strong> {formatDateTime(booking.end_time)}
          </div>
          {/* Add more booking details or actions here if needed */}
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
                <BookingCard key={booking.booking_id} booking={booking} />
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
                  <BookingCard booking={booking} />
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
                <BookingCard key={booking.booking_id} booking={booking} />
              ))
            ) : (
              <p className="text-muted mb-0">No past bookings found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}