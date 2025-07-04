import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ interpreterId: string; attractionId: string }> }
) {
  try {
    const { interpreterId: interpreterIdParam, attractionId: attractionIdParam } = await params;
    const interpreterId = parseInt(interpreterIdParam);
    const attractionId = parseInt(attractionIdParam);

    if (isNaN(interpreterId) || isNaN(attractionId)) {
      return NextResponse.json(
        { error: 'Invalid interpreter or attraction ID' },
        { status: 400 }
      );
    }

    const [rows] = await pool.query(
      'SELECT * FROM interpreterxattraction WHERE interpreter_id = ? AND attraction_id = ?',
      [interpreterId, attractionId]
    );

    if (!rows || (Array.isArray(rows) && rows.length === 0)) {
      return NextResponse.json(
        { error: 'Interpreter-Attraction combination not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(Array.isArray(rows) ? rows[0] : rows);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch interpreter-attraction data' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ interpreterId: string; attractionId: string }> }
) {
  try {
    const { interpreterId: interpreterIdParam, attractionId: attractionIdParam } = await params;
    const interpreterId = parseInt(interpreterIdParam);
    const attractionId = parseInt(attractionIdParam);
    const body = await request.json();

    if (isNaN(interpreterId) || isNaN(attractionId)) {
      return NextResponse.json(
        { error: 'Invalid interpreter or attraction ID' },
        { status: 400 }
      );
    }

    const { duration, buffer_time, max_traveler, price } = body;

    const [result] = await pool.query(
      `UPDATE interpreterxattraction 
       SET duration = ?, buffer_time = ?, max_traveler = ?, price = ?
       WHERE interpreter_id = ? AND attraction_id = ?`,
      [duration, buffer_time, max_traveler, price, interpreterId, attractionId]
    );

    if (!result || (Array.isArray(result) && result.length === 0)) {
      return NextResponse.json(
        { error: 'Interpreter-Attraction combination not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to update interpreter-attraction data' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ interpreterId: string; attractionId: string }> }
) {
  try {
    const { interpreterId: interpreterIdParam, attractionId: attractionIdParam } = await params;
    const interpreterId = parseInt(interpreterIdParam);
    const attractionId = parseInt(attractionIdParam);

    if (isNaN(interpreterId) || isNaN(attractionId)) {
      return NextResponse.json(
        { error: 'Invalid interpreter or attraction ID' },
        { status: 400 }
      );
    }

    // Delete related availability records first
    await pool.query(
      'DELETE FROM availability_interpreter WHERE interpreter_id = ? AND attraction_id = ?',
      [interpreterId, attractionId]
    );

    // Delete the attraction from interpreter
    const [result] = await pool.query(
      'DELETE FROM interpreterxattraction WHERE interpreter_id = ? AND attraction_id = ?',
      [interpreterId, attractionId]
    );

    if (!result || (Array.isArray(result) && result.length === 0)) {
      return NextResponse.json(
        { error: 'Interpreter-Attraction combination not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Interpreter-Attraction combination deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to delete interpreter-attraction data' },
      { status: 500 }
    );
  }
} 