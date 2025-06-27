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
    const interpreterxattraction_id = parseInt(id);

    // Validate ID
    if (isNaN(interpreterxattraction_id)) {
      return NextResponse.json(
        { error: 'Invalid interpreterxattraction ID' },
        { status: 400 }
      );
    }

    // Delete the interpreterxattraction
    const [result] = await conn.query(
      'DELETE FROM interpreterxattraction WHERE interpreterxattraction_id = ?',
      [interpreterxattraction_id]
    );

    if ((result as any).affectedRows === 0) {
      return NextResponse.json(
        { error: 'Interpreterxattraction not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Interpreterxattraction deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { message: 'Failed to delete interpreterxattraction' },
      { status: 500 }
    );
  }
}