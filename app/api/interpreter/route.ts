import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { fetchInterpreter } from '@/app/lib/interpreter';
import { Interpreter, User } from '@/app/lib/definitions';

const conn = await mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT? parseInt(process.env.MYSQL_PORT) : 3306,
});

export async function GET() {
  try {
    const interpreters = await fetchInterpreter();
    return NextResponse.json(interpreters);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch interpreters' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { user_id, gender, bio, introduction, primary_language_id } = body;

    // Validate required fields
    if (!user_id || !gender || !bio || !introduction || !primary_language_id) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user exists and is not already an interpreter
    const [existingUser] = await conn.query(
      'SELECT * FROM user WHERE user_id = ?',
      [user_id]
    );

    if (!existingUser || (existingUser as User[]).length === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const [existingInterpreter] = await conn.query(
      'SELECT * FROM interpreter WHERE user_id = ?',
      [user_id]
    );

    if ((existingInterpreter as Interpreter[]).length > 0) {
      return NextResponse.json(
        { error: 'User is already an interpreter' },
        { status: 400 }
      );
    }

    // Create interpreter
    await conn.query(
      `INSERT INTO interpreter (user_id, gender, bio, introduction, primary_language_id, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
      [user_id, gender, bio, introduction, primary_language_id]
    );

    return NextResponse.json(
      { message: 'Interpreter created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to create interpreter' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Interpreter ID is required' },
        { status: 400 }
      );
    }

    // Check if interpreter exists
    const [existingInterpreter] = await conn.query(
      'SELECT * FROM interpreter WHERE interpreter_id = ?',
      [id]
    );

    if (!existingInterpreter || (existingInterpreter as Interpreter[]).length === 0) {
      return NextResponse.json(
        { error: 'Interpreter not found' },
        { status: 404 }
      );
    }

    // Delete related records first
    await conn.query('DELETE FROM interpreterxlanguage WHERE interpreter_id = ?', [id]);
    await conn.query('DELETE FROM interpreterxattraction WHERE interpreter_id = ?', [id]);
    await conn.query('DELETE FROM availability_interpreter WHERE interpreter_id = ?', [id]);
    await conn.query('DELETE FROM booking WHERE interpreter_id = ?', [id]);

    // Delete interpreter
    await conn.query('DELETE FROM interpreter WHERE interpreter_id = ?', [id]);

    return NextResponse.json(
      { message: 'Interpreter deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to delete interpreter' },
      { status: 500 }
    );
  }
} 