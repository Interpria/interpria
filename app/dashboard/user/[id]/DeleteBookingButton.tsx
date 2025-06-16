'use client';

import { useRouter } from 'next/navigation';

export default function DeleteBookingButton({ bookingId }: { bookingId: number }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this booking?')) {
      try {
        const response = await fetch(`/api/booking/${bookingId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete booking');
        }

        router.refresh();
      } catch (error) {
        console.error('Error deleting booking:', error);
        alert('Failed to delete booking');
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="btn btn-danger btn-sm"
    >
      Delete
    </button>
  );
} 