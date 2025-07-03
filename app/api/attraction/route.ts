import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM attraction');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Database Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, description, address, postal_code, city, province, country, email, phone, website, category, longitude, latitude } = await request.json();

    const [result] = await pool.query(
      'INSERT INTO attraction (name, description, address, postal_code, city, province, country, email, phone, website, category, longitude, latitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, description, address, postal_code, city, province, country, email, phone, website, category, longitude, latitude]
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to create attraction' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { attraction_id, name, description, address, postal_code, city, province, country, email, phone, website, category, longitude, latitude } = await request.json();

    const [result] = await pool.query(
      'UPDATE attraction SET name = ?, description = ?, address = ?, postal_code = ?, city = ?, province = ?, country = ?, email = ?, phone = ?, website = ?, category = ?, longitude = ?, latitude = ? WHERE attraction_id = ?',
      [name, description, address, postal_code, city, province, country, email, phone, website, category, longitude, latitude, attraction_id]
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to update attraction' }, { status: 500 });
  }
}
