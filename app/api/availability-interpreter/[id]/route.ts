import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';
import { AvailabilityInterpreter } from '@/app/lib/definitions';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const availabilityId = parseInt(id);

    if (isNaN(availabilityId)) {
      return NextResponse.json(
        { error: 'Invalid availability ID' },
        { status: 400 }
      );
    }

    // Fetch the availability
    const [rows] = await pool.query(
      'SELECT * FROM availability_interpreter WHERE availability_id = ?',
      [availabilityId]
    );

    if ((rows as AvailabilityInterpreter[]).length === 0) {
      return NextResponse.json(
        { error: 'Availability not found' },
        { status: 404 }
      );
    }

    return NextResponse.json((rows as AvailabilityInterpreter[])[0], { status: 200 });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch availability' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const availabilityId = parseInt(id);

    if (isNaN(availabilityId)) {
      return NextResponse.json(
        { error: 'Invalid availability ID' },
        { status: 400 }
      );
    }

    // Delete the availability
    await pool.query(
      'DELETE FROM availability_interpreter WHERE availability_id = ?',
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