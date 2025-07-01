import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { Attraction} from '@/app/lib/definitions';

const conn = await mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    if (!id) {
        return NextResponse.json({ error: 'ID parameter is required' }, { status: 400 });
    }
    try {
        const [rows] = await fetchAttractionById(parseInt(id));
        return NextResponse.json(rows);
    }catch (error) {
        console.error('Error fetching attraction:', error);
        throw new Error('Failed to fetch attraction data.');
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
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

export async function fetchAttractionById(id: number) {
  try {
    const [rows] = await conn.query('SELECT * FROM `attraction` WHERE `attraction_id` = ?', [id]);
    return rows as Attraction[];
  }catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch attraction data.');
  }
}