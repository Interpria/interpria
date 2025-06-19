import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { AvailabilityInterpreter } from '@/app/lib/definitions';

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

export async function fetchAvailabilityInterpreterByInterpreterId(id: number) {
  try {
    const [rows] = await conn.query(`
      SELECT
        ai.*,
        a.attraction_id as attraction_id
      FROM availability_interpreter ai
      LEFT JOIN attraction a ON ai.attraction_id = a.attraction_id
      WHERE ai.interpreter_id = ? 
    `, [id]);
    return rows as (AvailabilityInterpreter & { attraction_id: number })[];
  }catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch interpreter data.');
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