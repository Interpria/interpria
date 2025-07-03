import mysql from 'mysql2/promise';
import { Interpreter, User } from '@/app/lib/definitions';

const conn = await mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT? parseInt(process.env.MYSQL_PORT) : 3306,
});

export async function fetchInterpreter() {
  try {
    const [rows] = await conn.query(`
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
    const [rows] = await conn.query(`
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
    return rows as (Interpreter & User & {
      languages: string;
      primary_language: string;
    })[];
  }catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch interpreter data.');
  }
}