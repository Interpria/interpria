import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const conn = await mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT? parseInt(process.env.MYSQL_PORT) : 3306,
});

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
    const [result] = await conn.query(
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