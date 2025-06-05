import { NextResponse } from 'next/server'
import mysql from 'mysql2/promise'

const conn = await mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT? parseInt(process.env.MYSQL_PORT) : 3306,
})

export async function GET(request: Request) {
  try {   
    const [rows] = await conn.query('SELECT * FROM user');
    return NextResponse.json(rows);
  }catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}



// export async function POST(request: Request) {
//   // parse request.json(), insert into DB, etc.
//   return NextResponse.json({ message: 'Created' }, { status: 201 })
// }


