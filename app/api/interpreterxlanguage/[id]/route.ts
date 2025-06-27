import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { Interpreterxlanguage } from '@/app/lib/definitions';

const conn = await mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT? parseInt(process.env.MYSQL_PORT) : 3306,
});

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { language_ids } = await request.json();
    const { id } = await params;
    const interpreterId = parseInt(id);

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

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const interpreterId = parseInt(id);

    if (isNaN(interpreterId)) {
      return NextResponse.json({ error: 'Invalid interpreter ID' }, { status: 400 });
    }

    const [rows] = await conn.query(
      `SELECT il.language_id, l.name
       FROM interpreterxlanguage il
       JOIN language l ON il.language_id = l.language_id
       WHERE il.interpreter_id = ?`,
      [interpreterId]
    );

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch interpreter languages' },
      { status: 500 }
    );
  }
}

export async function fetchInterpreterxlanguageByInterpreterId(interpreterId: number) {
  try {
    const [rows] = await conn.query(
      'SELECT * FROM `interpreterxlanguage` WHERE interpreter_id = ?',
      [interpreterId]
    );
    return rows as Interpreterxlanguage[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch interpreterxlanguage data.');
  }
}
