import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const conn = await mysql.createConnection({
host: process.env.MYSQL_HOST,
user: process.env.MYSQL_USER,
password: process.env.MYSQL_PASSWORD,
database: process.env.MYSQL_DATABASE,
port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT) : 3306,
});

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params;
  let rating: number;
  try {
    const body = await request.json();
    rating = Number(body.rating);
    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Invalid rating' }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  // Get interpreter_id for this booking
  const [rows] = await conn.execute<mysql.RowDataPacket[]>('SELECT interpreter_id FROM booking WHERE booking_id = ?', [id]);
  const interpreterId = Array.isArray(rows) && rows.length > 0 ? rows[0].interpreter_id : null;
  console.log('Interpreter ID:', interpreterId);
  if (!interpreterId) {
    await conn.end();
    return NextResponse.json({ error: 'Interpreter not found for this booking' }, { status: 404 });
  }

  await conn.execute('UPDATE booking SET rating = ?, status = "rated" WHERE booking_id = ?', [rating, id]);

  // Update interpreter's average rating
  await conn.execute(`
    UPDATE interpreter i
    JOIN (
      SELECT interpreter_id, AVG(rating) as avg_rating
      FROM booking
      WHERE status = 'rated' AND rating IS NOT NULL AND interpreter_id = ?
      GROUP BY interpreter_id
    ) as b ON i.interpreter_id = b.interpreter_id
    SET i.rating = b.avg_rating
    WHERE i.interpreter_id = ?
  `, [interpreterId, interpreterId]);

  await conn.end();
  return NextResponse.json({ success: true });
}
