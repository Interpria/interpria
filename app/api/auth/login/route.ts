import { NextResponse  } from 'next/server';
import pool from '@/app/lib/db';
import bcrypt from 'bcrypt';
import { createToken } from '@/lib/jwt';
import { verifyToken } from '@/lib/jwt';      // implement this to verify your token
import { cookies } from 'next/headers';       // for Next.js 13+ App Router
import { User } from '@/app/lib/definitions';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user by email
    const [rows] = await pool.query(
      'SELECT * FROM user WHERE email = ?',
      [email]
    );
    const users = rows as User[];

    const user = users[0];

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check if user is admin
    const isAdmin = user.role === 'admin';

    // Generate JWT token
    const token = await createToken({
      userId: user.user_id,
      email: user.email,
      role: user.role,
    });

    // Create response with redirect
    const response = isAdmin
      ? NextResponse.redirect(new URL('/dashboard', request.url))
      : NextResponse.redirect(new URL('/', request.url));

    // Set the token cookie
    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // 1) Read the httpOnly cookie
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // 2) Verify & decode
    const payload = await verifyToken(token); // should throw if invalid
    // e.g. payload = { userId: 123, email: "...", role: "user" }

    // 3) Return the decoded data
    return NextResponse.json({ user: payload });
  } catch (err) {
    console.error('GET /api/me error:', err);
    return NextResponse.json(
      { error: 'Forbidden' },
      { status: 403 }
    );
  }
}