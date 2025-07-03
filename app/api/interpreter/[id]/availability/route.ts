import { NextResponse } from 'next/server';
import { fetchAvailabilityInterpreterByInterpreterId } from '@/app/lib/availability-interpreter';
import pool from '@/app/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { interpreter_id, attraction_id, weekday, start_time, end_time } = body;

    // Validate required fields
    if (!interpreter_id || !attraction_id || weekday === undefined || !start_time || !end_time) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate weekday
    if (weekday < 0 || weekday > 6) {
      return NextResponse.json(
        { error: 'Invalid weekday' },
        { status: 400 }
      );
    }

    // Add availability
    await pool.query(
      `INSERT INTO availability_interpreter 
       (interpreter_id, attraction_id, weekday, start_time, end_time, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
      [interpreter_id, attraction_id, weekday, start_time, end_time]
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

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const interpreterId = parseInt(id);
    const availability = await fetchAvailabilityInterpreterByInterpreterId(interpreterId);
    return NextResponse.json(availability);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch availability' },
      { status: 500 }
    );
  }
}