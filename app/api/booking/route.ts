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

export async function fetchBooking() {
  try {
    const [rows] = await conn.query(`
      SELECT 
        b.*,
        u.name as user_name,
        i.name as interpreter_name,
        a.name as attraction_name,
        l.name as language_name
      FROM booking b
      LEFT JOIN user u ON b.user_id = u.user_id
      LEFT JOIN interpreter i2 ON b.interpreter_id = i2.interpreter_id
      LEFT JOIN user i ON i2.user_id = i.user_id
      LEFT JOIN attraction a ON b.attraction_id = a.attraction_id
      LEFT JOIN language l ON b.language_id = l.language_id
    `);
    return rows as (Booking & {
      user_name: string;
      interpreter_name: string;
      attraction_name: string;
      language_name: string;
    })[];
  }catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch booking data.');
  }
}

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

    if ((existingBookings as any[]).length > 0) {
      return NextResponse.json(
        { error: 'Interpreter is not available for the selected time slot' },
        { status: 400 }
      );
    }

    // Create the booking
    const [result] = await conn.query(`
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

