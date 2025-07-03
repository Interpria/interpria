import { Attraction, Interpreterxattraction } from '@/app/lib/definitions';
import pool from '@/app/lib/db';

export async function fetchAttraction() {
  try {
    const [rows] = await pool.query('SELECT * FROM `attraction`');
    return rows as Attraction[];
  }catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch attraction data.');
  }
}

export async function fetchAttractionById(id: number) {
  try {
    const [rows] = await pool.query('SELECT * FROM `attraction` WHERE `attraction_id` = ?', [id]);
    return rows as Attraction[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch attraction data.');
  }
}

export async function fetchInterpreterxattractionByAttractionId(attractionId: number) {
  try {
    const [rows] = await pool.query(`
      SELECT ixa.*
      FROM interpreterxattraction ixa
      WHERE ixa.attraction_id = ?
    `, [attractionId]);
    return rows as (Interpreterxattraction)[];
  }catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch interpreterxattraction data.');
  }
}