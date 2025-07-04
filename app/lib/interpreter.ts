import pool from '@/app/lib/db';
import { Interpreter, User } from '@/app/lib/definitions';

export async function fetchInterpreter() {
  try {
    const [rows] = await pool.query(`
      SELECT
        i.*,
        u.name,
        GROUP_CONCAT(DISTINCT l.name) as languages,
        (SELECT l2.name FROM language l2 WHERE l2.language_id = i.primary_language_id) as primary_language
      FROM interpreter i 
      JOIN user u ON i.user_id = u.user_id
      LEFT JOIN interpreterxlanguage il ON i.interpreter_id = il.interpreter_id
      LEFT JOIN language l ON il.language_id = l.language_id
      GROUP BY i.interpreter_id
    `);
    return rows as (Interpreter & { name: string; languages: string; primary_language: string })[];
  }catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch interpreter data.');
  }
}

export async function fetchInterpreterById(id: number) {
  try {
    const [rows] = await pool.query(`
      SELECT 
        i.*,
        u.*,
        GROUP_CONCAT(DISTINCT l.name) as languages,
        (SELECT l2.name FROM language l2 WHERE l2.language_id = i.primary_language_id) as primary_language
      FROM interpreter i 
      JOIN user u ON i.user_id = u.user_id
      LEFT JOIN interpreterxlanguage il ON i.interpreter_id = il.interpreter_id
      LEFT JOIN language l ON il.language_id = l.language_id
      WHERE i.interpreter_id = ?
      GROUP BY i.interpreter_id
    `, [id]);
    const row = Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
    return row as (Interpreter & User & {
      languages: string;
      primary_language: string;
    }) | null;
  }catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch interpreter data.');
  }
}