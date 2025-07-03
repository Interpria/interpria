import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';
import { fetchAvailabilityAttractionByAttractionId } from '@/app/lib/availability-attraction';

// by attraction ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const attractionId = parseInt(id, 10);
  if (isNaN(attractionId)) {
    return NextResponse.json({ error: 'Invalid Attraction ID' }, { status: 400 });
  }

  try {
    const rows = await fetchAvailabilityAttractionByAttractionId(attractionId);
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to fetch availability' }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const attractionId = parseInt(id);

    if (isNaN(attractionId)) {
      return NextResponse.json(
        { error: 'Invalid Attraction ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { weekday, start_time, end_time } = body;

    if (!weekday || !start_time || !end_time) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Insert the new availability
    await pool.query(
      'INSERT INTO availability_attraction (attraction_id, weekday, start_time, end_time) VALUES (?, ?, ?, ?)',
      [attractionId, weekday, start_time, end_time]
    );

    return NextResponse.json(
      { message: 'Availability added successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to add availability' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const availabilityId = parseInt(id);

    if (isNaN(availabilityId)) {
      return NextResponse.json(
        { error: 'Invalid Availability ID' },
        { status: 400 }
      );
    }

    // Delete the availability
    await pool.query(
      'DELETE FROM availability_attraction WHERE availability_id = ?',
      [availabilityId]
    );

    return NextResponse.json(
      { message: 'Availability deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to delete availability' },
      { status: 500 }
    );
  }
}