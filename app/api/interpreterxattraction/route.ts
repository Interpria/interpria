import { NextResponse } from 'next/server';
import { Interpreterxattraction } from '@/app/lib/definitions';
import pool from '@/app/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { interpreter_id, attraction_id, duration, buffer_time, max_traveler, price } = body;

    // Validate required fields
    if (!interpreter_id || !attraction_id || duration === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if the attraction is already assigned to this interpreter
    const [existing] = await pool.query(
      'SELECT * FROM interpreterxattraction WHERE interpreter_id = ? AND attraction_id = ?',
      [interpreter_id, attraction_id]
    );

    if ((existing as Interpreterxattraction[]).length > 0) {
      return NextResponse.json(
        { error: 'This attraction is already assigned to this interpreter' },
        { status: 400 }
      );
    }

    // Add attraction to interpreter
    await pool.query(
      `INSERT INTO interpreterxattraction 
       (interpreter_id, attraction_id, duration, price, buffer_time, max_traveler) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [interpreter_id, attraction_id, duration, price, buffer_time, max_traveler]
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