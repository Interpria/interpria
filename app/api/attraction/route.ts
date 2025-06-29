import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { Attraction, Interpreterxattraction, AvailabilityAttraction } from '@/app/lib/definitions';

const conn = await mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

export async function fetchAttraction() {
  try {
    const [rows] = await conn.query('SELECT * FROM `attraction`');
    return rows as Attraction[];
  }catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch attraction data.');
  }
}



export async function fetchAvailabilityAttraction() {
  try {
    const [rows] = await conn.query('SELECT * FROM `availability_attraction`');
    return rows as AvailabilityAttraction[];
  }catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch availability_attraction data.');
  }
}

export async function fetchInterpreterxattractionByAttractionId(attractionId: number) {
  try {
    const [rows] = await conn.query(`
      SELECT ixa.*
      FROM interpreterxattraction ixa
      WHERE ixa.attraction_id = ?
    `, [attractionId]);
    return rows as (Interpreterxattraction)[];
  }catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch interpreterxattraction data.');
  }
}

export async function GET() {
  try {
    const [rows] = await conn.query('SELECT * FROM attraction');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Database Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, description, address, postal_code, city, province, country, email, phone, website, category, longitude, latitude } = await request.json();

    const [result] = await conn.query(
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

    const [result] = await conn.query(
      'UPDATE attraction SET name = ?, description = ?, address = ?, postal_code = ?, city = ?, province = ?, country = ?, email = ?, phone = ?, website = ?, category = ?, longitude = ?, latitude = ? WHERE attraction_id = ?',
      [name, description, address, postal_code, city, province, country, email, phone, website, category, longitude, latitude, attraction_id]
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to update attraction' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const [result] = await conn.query(
      'DELETE FROM attraction WHERE attraction_id = ?',
      [id]
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to delete attraction' }, { status: 500 });
  }
} 