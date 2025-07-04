import { NextResponse } from 'next/server';
import { fetchInterpreterById } from '@/app/lib/interpreter';
import pool from '@/app/lib/db';

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
    await pool.query(
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
    return NextResponse.json(updatedInterpreter || {});
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { message: 'Failed to update interpreter' },
      { status: 500 }
    );
  }
}

