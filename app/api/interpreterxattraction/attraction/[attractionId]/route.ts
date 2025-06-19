import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const conn = await mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT? parseInt(process.env.MYSQL_PORT) : 3306,
});

export async function GET(
  request: Request,
  { params }: { params: Promise<{ attractionId: string }> }
) {
  try {
    const { attractionId: attractionIdParam } = await params;
    const attractionId = parseInt(attractionIdParam);

    if (isNaN(attractionId)) {
      return NextResponse.json(
        { error: 'Invalid attraction ID' },
        { status: 400 }
      );
    }

    const [rows] = await conn.query(
      `SELECT ixa.*, u.name, i.*,
              GROUP_CONCAT(DISTINCT l.name) as languages,
              (SELECT l2.name FROM language l2 WHERE l2.language_id = i.primary_language_id) as primary_language
       FROM interpreterxattraction ixa
       JOIN interpreter i ON ixa.interpreter_id = i.interpreter_id
       JOIN user u ON i.user_id = u.user_id
       LEFT JOIN interpreterxlanguage il ON i.interpreter_id = il.interpreter_id
       LEFT JOIN language l ON il.language_id = l.language_id
       WHERE ixa.attraction_id = ?
       GROUP BY ixa.interpreterxattraction_id`,
      [attractionId]
    );

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch interpreter data' },
      { status: 500 }
    );
  }
} 