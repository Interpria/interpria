import { NextResponse } from 'next/server';
import { fetchInterpreterxattractionByInterpreterId } from '@/app/lib/interpreterxattraction';
import pool from '@/app/lib/db';

export async function GET(request: Request, { params }: { params: Promise<{ interpreterId: string }> }) {
  try {
    const { interpreterId } = await params;
    const interpreterxattraction = await fetchInterpreterxattractionByInterpreterId(parseInt(interpreterId));
    return NextResponse.json(interpreterxattraction);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch interpreterxattraction' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { attraction_id, duration, buffer_time, max_traveler, price } = body;
    const { id } = await params;
    const interpreter_id = parseInt(id);

    // Validate required fields
    if (!attraction_id || duration === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Add attraction to interpreter
    await pool.query(
      `INSERT INTO interpreterxattraction 
       (interpreter_id, attraction_id, duration, buffer_time, max_traveler, price) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [interpreter_id, attraction_id, duration, buffer_time, max_traveler, price]
    );

    return NextResponse.json(
      { message: 'Attraction added successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to add attraction' },
      { status: 500 }
    );
  }
} 