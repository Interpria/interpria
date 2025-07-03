import pool from '@/app/lib/db';
import { Interpreterxattraction } from '@/app/lib/definitions';

export async function fetchInterpreterxattraction() {
  try {
    const [rows] = await pool.query('SELECT * FROM `interpreterxattraction`');
    return rows as Interpreterxattraction[];
  }catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch interpreterxattraction data.');
  }
}

export async function fetchInterpreterxattractionByInterpreterId(interpreterId: number) {
  try {
    const [rows] = await pool.query(`
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