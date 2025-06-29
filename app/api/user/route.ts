import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { User } from '@/app/lib/definitions';

const conn = await mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT? parseInt(process.env.MYSQL_PORT) : 3306,
});

export async function GET() {
  try {
    const [rows] = await conn.query('SELECT * FROM `user`');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function fetchUser() {
  try {
    const [rows] = await conn.query('SELECT * FROM `user`');
    return rows as User[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch user data.');
  }
}



export async function POST(request: Request) {
  try {
    const { email, name, role, phone_num } = await request.json();
    
    const [result] = await conn.query(
      'INSERT INTO user (email, name, role, phone_num) VALUES (?, ?, ?, ?)',
      [email, name, role, phone_num]
    );
    
    return NextResponse.json({ message: 'User created successfully', result });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { user_id, email, name, role, phone_num } = await request.json();
    
    const [result] = await conn.query(
      'UPDATE user SET email = ?, name = ?, role = ?, phone_num = ? WHERE user_id = ?',
      [email, name, role, phone_num, user_id]
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
    
    const [result] = await conn.query(
      'DELETE FROM user WHERE user_id = ?',
      [user_id]
    );
    
    return NextResponse.json({ message: 'User deleted successfully', result });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
