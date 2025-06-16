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
  { params }: { params: { id: string; attractionId: string } }
) {
  try {
    const interpreterId = parseInt(params.id);
    const attractionId = parseInt(params.attractionId);

    if (isNaN(interpreterId) || isNaN(attractionId)) {
      return NextResponse.json(
        { error: 'Invalid interpreter ID or attraction ID' },
        { status: 400 }
      );
    }

    // Delete related availability records first
    await conn.query(
      'DELETE FROM availability_interpreter WHERE interpreter_id = ? AND attraction_id = ?',
      [interpreterId, attractionId]
    );

    // Delete the attraction from interpreter
    const [result] = await conn.query(
      'DELETE FROM interpreterxattraction WHERE interpreter_id = ? AND attraction_id = ?',
      [interpreterId, attractionId]
    );

    return NextResponse.json(
      { message: 'Attraction removed successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to remove attraction' },
      { status: 500 }
    );
  }
} 