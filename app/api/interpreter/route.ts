import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { Interpreter, User, AvailabilityInterpreter } from '@/app/lib/definitions';

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

export async function fetchInterpreter() {
  try {
    const [rows] = await conn.query(`
      SELECT
        i.*,
        u.name,
        GROUP_CONCAT(DISTINCT l.name) as languages,
        (SELECT l2.name FROM language l2 WHERE l2.language_id = i.primary_language_id) as primary_language
      FROM interpreter i 
      JOIN user u ON i.user_id = u.user_id
      LEFT JOIN interpreterxlanguage il ON i.interpreter_id = il.interpreter_id
      LEFT JOIN language l ON il.language_id = l.language_id
      GROUP BY i.interpreter_id
    `);
    return rows as (Interpreter & { name: string; languages: string; primary_language: string })[];
  }catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch interpreter data.');
  }
}

export async function fetchAvailabilityInterpreter() {
  try {
    const [rows] = await conn.query('SELECT * FROM `availability_interpreter`');
    return rows as AvailabilityInterpreter[];
  }catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch availability_interpreter data.');
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

    if (!existingUser || (existingUser as any[]).length === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const [existingInterpreter] = await conn.query(
      'SELECT * FROM interpreter WHERE user_id = ?',
      [user_id]
    );

    if ((existingInterpreter as any[]).length > 0) {
      return NextResponse.json(
        { error: 'User is already an interpreter' },
        { status: 400 }
      );
    }

    // Create interpreter
    const [result] = await conn.query(
      `INSERT INTO interpreter (user_id, gender, bio, introduction, primary_language_id, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
      [user_id, gender, bio, introduction, primary_language_id]
    );

    return NextResponse.json(
      { message: 'Interpreter created successfully', interpreter_id: (result as any).insertId },
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

    if (!existingInterpreter || (existingInterpreter as any[]).length === 0) {
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