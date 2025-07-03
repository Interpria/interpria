import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import pool from '@/app/lib/db';

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM `user`');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { email, name, role, phone } = await request.json();
    // Set default password as 'password' and hash it
    const defaultPassword = 'password';
    const password_hash = await bcrypt.hash(defaultPassword, 10);

    const [result] = await pool.query(
      'INSERT INTO user (email, name, role, phone, password_hash) VALUES (?, ?, ?, ?, ?)',
      [email, name, role, phone, password_hash]
    );
    
    return NextResponse.json({ message: 'User created successfully', result });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { user_id, email, name, role, phone } = await request.json();
    
    const [result] = await pool.query(
      'UPDATE user SET email = ?, name = ?, role = ?, phone = ? WHERE user_id = ?',
      [email, name, role, phone, user_id]
    );
    
    return NextResponse.json({ message: 'User updated successfully', result });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { user_id } = await request.json();
    
    const [result] = await pool.query(
      'DELETE FROM user WHERE user_id = ?',
      [user_id]
    );
    
    return NextResponse.json({ message: 'User deleted successfully', result });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
