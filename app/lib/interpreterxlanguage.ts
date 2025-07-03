import pool from '@/app/lib/db';
import { Interpreterxlanguage } from '@/app/lib/definitions';

export async function fetchInterpreterxlanguage() {
  try {
    const [rows] = await pool.query('SELECT * FROM `interpreterxlanguage`');
    return rows as Interpreterxlanguage[];
  }catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch interpreterxlanguage data.');
  }
}

export async function fetchInterpreterxlanguageByInterpreterId(interpreterId: number) {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM `interpreterxlanguage` WHERE interpreter_id = ?',
      [interpreterId]
    );
    return rows as Interpreterxlanguage[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch interpreterxlanguage data.');
  }
}