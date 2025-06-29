import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const conn = await mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT? parseInt(process.env.MYSQL_PORT) : 3306,
});

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const availabilityId = parseInt(id);

    if (isNaN(availabilityId)) {
      return NextResponse.json(
        { error: 'Invalid availability ID' },
        { status: 400 }
      );
    }

    // Delete the availability
    const [result] = await conn.query(
      'DELETE FROM availability_interpreter WHERE availability_id = ?',
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