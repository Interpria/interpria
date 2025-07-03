import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { fetchInterpreterById } from '@/app/lib/interpreter';

const conn = await mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT? parseInt(process.env.MYSQL_PORT) : 3306,
});

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { message: 'ID parameter is required' },
        { status: 400 }
      );
    }
    const interpreter = await fetchInterpreterById(parseInt(id));
    return NextResponse.json(interpreter);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch interpreters' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { message: 'ID parameter is required' },
        { status: 400 }
      );
    }

    const data = await request.json();
    const {
      bio,
      introduction,
      primary_language_id
    } = data;

    // Update interpreter and user tables
    await conn.query(
      `
      UPDATE interpreter i
      SET 
        i.bio = ?,
        i.introduction = ?,
        i.primary_language_id = ?
      WHERE i.interpreter_id = ?
      `,
      [
        bio,
        introduction,
        primary_language_id,
        parseInt(id)
      ]
    );

    const updatedInterpreter = await fetchInterpreterById(parseInt(id));
    return NextResponse.json(updatedInterpreter[0] || {});
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { message: 'Failed to update interpreter' },
      { status: 500 }
    );
  }
}

