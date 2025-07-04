import { NextResponse } from 'next/server';
import { fetchUserById } from '@/app/lib/user';
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
    const user = await fetchUserById(parseInt(id));
    return NextResponse.json(user);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch user profile' },
      { status: 500 }
    );
  }
}

export async function PATCH(
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

    const body = await request.json();
    const { phone } = body;

    if (!phone) {
      return NextResponse.json(
        { message: 'Phone number is required' },
        { status: 400 }
      );
    }

    await pool.query(
      `
      UPDATE user
      SET phone = ?
      WHERE user_id = ?
    `,
      [phone, parseInt(id)]
    );

    const updatedUser = await fetchUserById(parseInt(id));
    return NextResponse.json(updatedUser[0] || {});
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { message: 'Failed to update user profile' },
      { status: 500 }
    );
  }
}