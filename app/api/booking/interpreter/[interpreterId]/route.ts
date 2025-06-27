import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { Booking } from '@/app/lib/definitions';

const conn = await mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT) : 3306,
});

export async function fetchBookingsByInterpreterId(interpreterId: number) {
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
      WHERE b.interpreter_id = ?
    `, [interpreterId]);
    return rows as (Booking & {
      user_name: string;
      interpreter_name: string;
      attraction_name: string;
      language_name: string;
    })[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch booking data.');
  }
}

export async function GET(request: Request, { params }: { params: { interpreterId: string } }) {
  const { interpreterId } = params;
  if (!interpreterId) {
    return NextResponse.json({ error: 'Interpreter ID parameter is required' }, { status: 400 });
  }
  try {
    const bookings = await fetchBookingsByInterpreterId(parseInt(interpreterId));
    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}