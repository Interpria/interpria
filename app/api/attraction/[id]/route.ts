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

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: 'ID parameter is required' }, { status: 400 });
  }
  try {
    const conn = await getConn();
    const [rows] = await conn.query('SELECT * FROM `attraction` WHERE `attraction_id` = ?', [parseInt(id)]);
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching attraction:', error);
    return NextResponse.json({ error: 'Failed to fetch attraction data.' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    const conn = await getConn();
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

