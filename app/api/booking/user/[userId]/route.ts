import { NextResponse } from 'next/server';
import { fetchBookingsByUserId } from '@/app/lib/booking';

export async function GET(request: Request, { params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  if (!userId) {
    return NextResponse.json({ error: 'User ID parameter is required' }, { status: 400 });
  }
  try {
    const bookings = await fetchBookingsByUserId(parseInt(userId));
    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}