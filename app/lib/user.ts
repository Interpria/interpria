import pool from '@/app/lib/db';
import { User } from '@/app/lib/definitions';

export async function fetchUser() {
  try {
    const [rows] = await pool.query('SELECT * FROM `user`');
    return rows as User[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch user data.');
  }
}

export async function fetchUserById(id: number) {
  try {
    const [rows] = await pool.query(
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