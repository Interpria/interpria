import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

let conn: mysql.Connection | null = null;
async function getConn() {
  if (!conn) {
    conn = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });
  }
  return conn;
}

export async function GET() {
  try {
    const conn = await getConn();
    const [rows] = await conn.query('SELECT * FROM attraction');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Database Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const conn = await getConn();
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
    const conn = await getConn();
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
