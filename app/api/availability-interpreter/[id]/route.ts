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
    const { id } = params;
    const availabilityId = parseInt(id);

    if (isNaN(availabilityId)) {
      return NextResponse.json(
        { error: 'Invalid availability ID' },
        { status: 400 }
      );
    }

    // Fetch the availability
    const [rows] = await conn.query(
      'SELECT * FROM availability_interpreter WHERE availability_id = ?',
      [availabilityId]
    );

    if ((rows as any[]).length === 0) {
      return NextResponse.json(
        { error: 'Availability not found' },
        { status: 404 }
      );
    }

    return NextResponse.json((rows as any[])[0], { status: 200 });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch availability' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
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