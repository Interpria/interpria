import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: 'ID parameter is required' }, { status: 400 });
  }
  try {
    const [rows] = await pool.query('SELECT * FROM `attraction` WHERE `attraction_id` = ?', [parseInt(id)]);
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching attraction:', error);
    return NextResponse.json({ error: 'Failed to fetch attraction data.' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    const [result] = await pool.query(
      'DELETE FROM attraction WHERE attraction_id = ?',
      [id]
    );
    return NextResponse.json(result);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to delete attraction' }, { status: 500 });
  }
}

