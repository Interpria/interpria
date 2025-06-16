import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const conn = await mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT? parseInt(process.env.MYSQL_PORT) : 3306,
});

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { language_ids } = await request.json();
    const interpreterId = parseInt(params.id);

    // First, delete all existing language associations
    await conn.query(
      'DELETE FROM interpreterxlanguage WHERE interpreter_id = ?',
      [interpreterId]
    );

    // Then, insert the new language associations
    if (language_ids.length > 0) {
      const values = language_ids.map((langId: number) => [interpreterId, langId]);
      await conn.query(
        'INSERT INTO interpreterxlanguage (interpreter_id, language_id) VALUES ?',
        [values]
      );
    }

    return NextResponse.json({ message: 'Languages updated successfully' });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { message: 'Failed to update languages' },
      { status: 500 }
    );
  }
} 