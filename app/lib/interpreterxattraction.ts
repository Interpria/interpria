import mysql from 'mysql2/promise';
import { Interpreterxattraction } from '@/app/lib/definitions';

const conn = await mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT? parseInt(process.env.MYSQL_PORT) : 3306,
});

export async function fetchInterpreterxattraction() {
  try {
    const [rows] = await conn.query('SELECT * FROM `interpreterxattraction`');
    return rows as Interpreterxattraction[];
  }catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch interpreterxattraction data.');
  }
}

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