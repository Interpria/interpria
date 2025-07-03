import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';

export async function GET() {
  try {
    const [rows] = await pool.query(`
      SELECT * FROM language 
      ORDER BY name ASC
    `);
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch languages' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { code, name } = await request.json();
    
    const [result] = await pool.query(
      'INSERT INTO language (code, name) VALUES (?, ?)',
      [code || null, name]
    );
    
    return NextResponse.json({ message: 'Language created successfully', result });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to create language' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { language_id, code, name } = await request.json();
    
    const [result] = await pool.query(
      'UPDATE language SET code = ?, name = ? WHERE language_id = ?',
      [code || null, name, language_id]
    );
    
    return NextResponse.json({ message: 'Language updated successfully', result });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to update language' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { language_id } = await request.json();
    
    const [result] = await pool.query(
      'DELETE FROM language WHERE language_id = ?',
      [language_id]
    );
    
    return NextResponse.json({ message: 'Language deleted successfully', result });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to delete language' }, { status: 500 });
  }
} 