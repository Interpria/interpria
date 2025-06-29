import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { Language } from '@/app/lib/definitions';

const conn = await mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT? parseInt(process.env.MYSQL_PORT) : 3306,
});

export async function GET() {
  try {
    const [rows] = await conn.query(`
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

export async function fetchLanguage() {
  try {
    const [rows] = await conn.query('SELECT * FROM `language`');
    return rows as Language[];
  }catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch language data.');
  }
}

export async function POST(request: Request) {
  try {
    const { code, name } = await request.json();
    
    const [result] = await conn.query(
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
    
    const [result] = await conn.query(
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
    
    const [result] = await conn.query(
      'DELETE FROM language WHERE language_id = ?',
      [language_id]
    );
    
    return NextResponse.json({ message: 'Language deleted successfully', result });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to delete language' }, { status: 500 });
  }
} 