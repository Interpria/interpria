import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { Booking } from '@/app/lib/definitions';

const conn = await mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT? parseInt(process.env.MYSQL_PORT) : 3306,
})

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      user_id, 
      interpreter_id, 
      attraction_id, 
      language_id,
      start_time,
      end_time,
      num_people,
      price,
      status
    } = body;

    // Validate required fields
    if (!user_id || !interpreter_id || !attraction_id || !language_id || !start_time || !end_time || !num_people) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if the interpreter is available for the selected time slot
    const [existingBookings] = await conn.query(`
      SELECT * FROM booking 
      WHERE interpreter_id = ? 
      AND (
        (start_time <= ? AND end_time >= ?) OR
        (start_time <= ? AND end_time >= ?) OR
        (start_time >= ? AND end_time <= ?)
      )
    `, [
      interpreter_id,
      start_time, start_time,
      end_time, end_time,
      start_time, end_time
    ]);

    if ((existingBookings as Booking[]).length > 0) {
      return NextResponse.json(
        { error: 'Interpreter is not available for the selected time slot' },
        { status: 400 }
      );
    }

    await conn.query(`
      INSERT INTO booking (
        user_id, 
        interpreter_id, 
        attraction_id, 
        language_id,
        start_time,
        end_time,
        num_people,
        price,
        status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      user_id,
      interpreter_id,
      attraction_id,
      language_id,
      start_time,
      end_time,
      num_people,
      price,
      status
    ]);

    return NextResponse.json(
      { message: 'Booking created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}

