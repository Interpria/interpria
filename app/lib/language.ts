import mysql from 'mysql2/promise';
import { Language } from '@/app/lib/definitions';

const conn = await mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT? parseInt(process.env.MYSQL_PORT) : 3306,
});

export async function fetchLanguage() {
  try {
    const [rows] = await conn.query('SELECT * FROM `language`');
    return rows as Language[];
  }catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch language data.');
  }
}