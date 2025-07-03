import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { language_ids } = await request.json();
    const { id } = await params;
    const interpreterId = parseInt(id);

    // First, delete all existing language associations
    await pool.query(
      'DELETE FROM interpreterxlanguage WHERE interpreter_id = ?',
      [interpreterId]
    );

    // Then, insert the new language associations
    if (language_ids.length > 0) {
      const values = language_ids.map((langId: number) => [interpreterId, langId]);
      await pool.query(
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const interpreterId = parseInt(id);

    if (isNaN(interpreterId)) {
      return NextResponse.json({ error: 'Invalid interpreter ID' }, { status: 400 });
    }

    const [rows] = await pool.query(
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


