import pool from '@/app/lib/db';
import { Language } from '@/app/lib/definitions';

export async function fetchLanguage() {
  try {
    const [rows] = await pool.query('SELECT * FROM `language`');
    return rows as Language[];
  }catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch language data.');
  }
}