import { NextResponse } from 'next/server';
import { fetchBookingsByInterpreterId } from '@/app/lib/booking';


export async function GET(request: Request, { params }: { params: Promise<{ interpreterId: string }> }) {
  const { interpreterId } = await params;
  if (!interpreterId) {
    return NextResponse.json({ error: 'Interpreter ID parameter is required' }, { status: 400 });
  }
  try {
    const bookings = await fetchBookingsByInterpreterId(parseInt(interpreterId));
    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}