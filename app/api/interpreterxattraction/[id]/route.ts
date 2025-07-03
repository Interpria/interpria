import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const interpreterxattraction_id = parseInt(id);

    // Validate ID
    if (isNaN(interpreterxattraction_id)) {
      return NextResponse.json(
        { error: 'Invalid interpreterxattraction ID' },
        { status: 400 }
      );
    }

    // Delete the interpreterxattraction
    await pool.query(
      'DELETE FROM interpreterxattraction WHERE interpreterxattraction_id = ?',
      [interpreterxattraction_id]
    );

    return NextResponse.json(
      { message: 'Interpreterxattraction deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { message: 'Failed to delete interpreterxattraction' },
      { status: 500 }
    );
  }
}