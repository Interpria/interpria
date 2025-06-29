import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { Booking } from '@/app/lib/definitions';

const conn = await mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT? parseInt(process.env.MYSQL_PORT) : 3306,
});

export async function fetchBookingsById(id: number) {
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
      WHERE b.booking_id = ?
    `, [id]);
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

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: 'ID parameter is required' }, { status: 400 });
  }

  try {
    const bookings = await fetchBookingsById(parseInt(id));
    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Delete the booking
    const [result] = await conn.query(
      'DELETE FROM booking WHERE booking_id = ?',
      [id]
    );

    if ((result as any).affectedRows === 0) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Booking deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to delete booking' },
      { status: 500 }
    );
  }
} 

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { error: 'Status is required' },
        { status: 400 }
      );
    }

    const [result] = await conn.query(
      'UPDATE booking SET status = ? WHERE booking_id = ?',
      [status, id]
    );

    if ((result as any).affectedRows === 0) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Booking status updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to update booking status' },
      { status: 500 }
    );
  }
}