import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const conn = await mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT) : 3306,
});

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const attractionId = parseInt(id);

    if (isNaN(attractionId)) {
      return NextResponse.json(
        { error: 'Invalid Attraction ID' },
        { status: 400 }
      );
    }

    // Fetch the availability
    const [rows] = await conn.query(
      'SELECT * FROM availability_attraction WHERE attraction_id = ?',
      [attractionId]
    );

    if ((rows as any[]).length === 0) {
      return NextResponse.json(
        { error: 'Availability not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch availability' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const attractionId = parseInt(id);

    if (isNaN(attractionId)) {
      return NextResponse.json(
        { error: 'Invalid Attraction ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { weekday, start_time, end_time } = body;

    if (!weekday || !start_time || !end_time) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Insert the new availability
    const [result]: any = await conn.query(
      'INSERT INTO availability_attraction (attraction_id, weekday, start_time, end_time) VALUES (?, ?, ?, ?)',
      [attractionId, weekday, start_time, end_time]
    );

    return NextResponse.json(
      { message: 'Availability added successfully', id: result.insertId },
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

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const availabilityId = parseInt(id);

    if (isNaN(availabilityId)) {
      return NextResponse.json(
        { error: 'Invalid Availability ID' },
        { status: 400 }
      );
    }

    // Delete the availability
    const [result] = await conn.query(
      'DELETE FROM availability_attraction WHERE availability_id = ?',
      [availabilityId]
    );

    if ((result as any).affectedRows === 0) {
      return NextResponse.json(
        { error: 'Availability not found' },
        { status: 404 }
      );
    }

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