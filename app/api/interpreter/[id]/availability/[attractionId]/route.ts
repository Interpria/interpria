import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';

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