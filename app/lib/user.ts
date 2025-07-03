import mysql from 'mysql2/promise';
import { User } from '@/app/lib/definitions';

const conn = await mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT) : 3306,
});

export async function fetchUser() {
  try {
    const [rows] = await conn.query('SELECT * FROM `user`');
    return rows as User[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch user data.');
  }
}

export async function fetchUserById(id: number) {
  try {
    const [rows] = await conn.query(
      `
      SELECT
        u.*,
        i.interpreter_id
      FROM user u
      LEFT JOIN interpreter i ON u.user_id = i.user_id
      WHERE u.user_id = ?
    `,
      [id]
    );
    return rows as (User & { interpreter_id: number })[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch user data.');
  }
}