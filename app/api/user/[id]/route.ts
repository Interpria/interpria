import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { User } from '@/app/lib/definitions';

const conn = await mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT) : 3306,
});

// FIX: params should not be a Promise, just an object
export async function GET(request: Request, { params }: { params: { id: string } }) {
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

    const body = await request.json();
    const { phone } = body;

    if (!phone) {
      return NextResponse.json(
        { message: 'Phone number is required' },
        { status: 400 }
      );
    }

    const [result]: any = await conn.query(
      `
      UPDATE user
      SET phone = ?
      WHERE user_id = ?
    `,
      [phone, parseInt(id)]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: 'User not found or no changes made' },
        { status: 404 }
      );
    }

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

export async function fetchUserById(id: number) {
  try {
    const [rows] = await conn.query(
      `
      SELECT
        u.*,
        i.interpreter_id
      FROM user u
      LEFT JOIN interpreter i ON u.user_id = i.user_id
      WHERE u.user_id = ?
    `,
      [id]
    );
    return rows as (User & { interpreter_id: number })[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch user data.');
  }
}