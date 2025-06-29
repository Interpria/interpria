import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { Interpreterxattraction } from '@/app/lib/definitions';

const conn = await mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT? parseInt(process.env.MYSQL_PORT) : 3306,
});

export async function fetchInterpreterxattractionByInterpreterId(interpreterId: number) {
  try {
    const [rows] = await conn.query(`
      SELECT 
        ixa.*,
        a.name as attraction_name
      FROM interpreterxattraction ixa
      LEFT JOIN attraction a ON ixa.attraction_id = a.attraction_id
      WHERE ixa.interpreter_id = ?
    `, [interpreterId]);
    return rows as (Interpreterxattraction & { attraction_name: string })[];
  }catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch interpreterxattraction data.');
  }
}

export async function GET(request: Request, { params }: { params: Promise<{ interpreterId: string }> }) {
  try {
    const { interpreterId } = await params;
    const interpreterxattraction = await fetchInterpreterxattractionByInterpreterId(parseInt(interpreterId));
    return NextResponse.json(interpreterxattraction);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch interpreterxattraction' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { attraction_id, duration, buffer_time, max_traveler, price } = body;
    const { id } = await params;
    const interpreter_id = parseInt(id);

    // Validate required fields
    if (!attraction_id || duration === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Add attraction to interpreter
    const [result] = await conn.query(
      `INSERT INTO interpreterxattraction 
       (interpreter_id, attraction_id, duration, buffer_time, max_traveler, price) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [interpreter_id, attraction_id, duration, buffer_time, max_traveler, price]
    );

    return NextResponse.json(
      { message: 'Attraction added successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to add attraction' },
      { status: 500 }
    );
  }
} 