import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';
import bcrypt from 'bcrypt';
import { User } from '@/app/lib/definitions';

export async function POST(request: Request) {
  try {
    const { name, email, password, phone } = await request.json();

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const [existingUsers] = await pool.query(
      'SELECT * FROM user WHERE email = ?',
      [email]
    );

    if ((existingUsers as User[]).length > 0) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    // Hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Insert new user
    await pool.query(
      'INSERT INTO user (name, email, password_hash, role, phone) VALUES (?, ?, ?, ?, ?)',
      [name, email, passwordHash, 'traveler', phone || null]
    );

    return NextResponse.json(
      { message: 'Registration successful' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
