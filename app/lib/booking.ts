import pool from '@/app/lib/db';
import { Booking } from '@/app/lib/definitions';

export async function fetchBooking() {
  try {
    const [rows] = await pool.query(`
      SELECT 
        b.*,
        u.name as user_name,
        i.name as interpreter_name,
        a.name as attraction_name,
        l.name as language_name
      FROM booking b
      LEFT JOIN user u ON b.user_id = u.user_id
      LEFT JOIN interpreter i2 ON b.interpreter_id = i2.interpreter_id
      LEFT JOIN user i ON i2.user_id = i.user_id
      LEFT JOIN attraction a ON b.attraction_id = a.attraction_id
      LEFT JOIN language l ON b.language_id = l.language_id
    `);
    return rows as (Booking & {
      user_name: string;
      interpreter_name: string;
      attraction_name: string;
      language_name: string;
    })[];
  }catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch booking data.');
  }
}

export async function fetchBookingsById(id: number) {
  try {
    const [rows] = await pool.query(`
      SELECT 
        b.*,
        u.name as user_name,
        i.name as interpreter_name,
        a.name as attraction_name,
        l.name as language_name
      FROM booking b
      LEFT JOIN user u ON b.user_id = u.user_id
      LEFT JOIN interpreter i2 ON b.interpreter_id = i2.interpreter_id
      LEFT JOIN user i ON i2.user_id = i.user_id
      LEFT JOIN attraction a ON b.attraction_id = a.attraction_id
      LEFT JOIN language l ON b.language_id = l.language_id
      WHERE b.booking_id = ?
    `, [id]);
    return rows as (Booking & {
      user_name: string;
      interpreter_name: string;
      attraction_name: string;
      language_name: string;
    })[];
  }catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch booking data.');
  }
}

export async function fetchBookingsByUserId(userId: number) {
  try {
    const [rows] = await pool.query(`
      SELECT 
        b.*,
        u.name as user_name,
        i.name as interpreter_name,
        a.name as attraction_name,
        l.name as language_name
      FROM booking b
      LEFT JOIN user u ON b.user_id = u.user_id
      LEFT JOIN interpreter i2 ON b.interpreter_id = i2.interpreter_id
      LEFT JOIN user i ON i2.user_id = i.user_id
      LEFT JOIN attraction a ON b.attraction_id = a.attraction_id
      LEFT JOIN language l ON b.language_id = l.language_id
      WHERE b.user_id = ?
    `, [userId]);
    return rows as (Booking & {
      user_name: string;
      interpreter_name: string;
      attraction_name: string;
      language_name: string;
    })[];
  }catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch booking data.');
  }
}

export async function fetchBookingsByInterpreterId(interpreterId: number) {
  try {
    const [rows] = await pool.query(`
      SELECT 
        b.*,
        u.name as user_name,
        i.name as interpreter_name,
        a.name as attraction_name,
        l.name as language_name
      FROM booking b
      LEFT JOIN user u ON b.user_id = u.user_id
      LEFT JOIN interpreter i2 ON b.interpreter_id = i2.interpreter_id
      LEFT JOIN user i ON i2.user_id = i.user_id
      LEFT JOIN attraction a ON b.attraction_id = a.attraction_id
      LEFT JOIN language l ON b.language_id = l.language_id
      WHERE b.interpreter_id = ?
    `, [interpreterId]);
    return rows as (Booking & {
      user_name: string;
      interpreter_name: string;
      attraction_name: string;
      language_name: string;
    })[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch booking data.');
  }
}