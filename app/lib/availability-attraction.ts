import { AvailabilityAttraction } from '@/app/lib/definitions';
import pool from '@/app/lib/db';

export async function fetchAvailabilityAttraction() {
  try {
    const [rows] = await pool.query('SELECT * FROM `availability_attraction`');
    return rows as AvailabilityAttraction[];
  }catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch availability_attraction data.');
  }
}

export async function fetchAvailabilityAttractionByAttractionId(attractionId: number) {
  try {
    const [rows] = await pool.query('SELECT * FROM `availability_attraction` WHERE `attraction_id` = ?', [attractionId]);
    return rows as AvailabilityAttraction[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch availability_attraction data.');
  }
}