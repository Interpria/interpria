import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';
import bcrypt from 'bcrypt';
import { User } from '@/app/lib/definitions';
import crypto from 'crypto';

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

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Insert new user with is_verified and verification_token
    await pool.query(
      'INSERT INTO user (name, email, password_hash, role, phone, is_verified, verification_token) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, email, passwordHash, 'user', phone || null, false, verificationToken]
    );

    // Send verification email here

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
