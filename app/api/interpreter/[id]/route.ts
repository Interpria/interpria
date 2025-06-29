import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { Interpreter, User } from '@/app/lib/definitions';

const conn = await mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT? parseInt(process.env.MYSQL_PORT) : 3306,
});

export async function GET(request: Request, { params }: { params: { id: string } }) {
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
  { params }: { params: { id: string } }
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
    const [result] = await conn.query(
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

    if ((result as any).affectedRows === 0) {
      return NextResponse.json(
        { message: 'Interpreter not found or no changes made' },
        { status: 404 }
      );
    }

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

export async function fetchInterpreterById(id: number) {
  try {
    const [rows] = await conn.query(`
      SELECT 
        i.*,
        u.*,
        GROUP_CONCAT(DISTINCT l.name) as languages,
        (SELECT l2.name FROM language l2 WHERE l2.language_id = i.primary_language_id) as primary_language
      FROM interpreter i 
      JOIN user u ON i.user_id = u.user_id
      LEFT JOIN interpreterxlanguage il ON i.interpreter_id = il.interpreter_id
      LEFT JOIN language l ON il.language_id = l.language_id
      WHERE i.interpreter_id = ?
      GROUP BY i.interpreter_id
    `, [id]);
    return rows as (Interpreter & User & {
      languages: string;
      primary_language: string;
    })[];
  }catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch interpreter data.');
  }
}