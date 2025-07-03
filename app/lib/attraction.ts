import { Attraction, Interpreterxattraction, AvailabilityAttraction } from '@/app/lib/definitions';
import mysql from 'mysql2/promise';

let conn: mysql.Connection | null = null;
async function getConn() {
  if (!conn) {
    conn = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });
  }
  return conn;
}

export async function fetchAttraction() {
  try {
    const conn = await getConn();
    const [rows] = await conn.query('SELECT * FROM `attraction`');
    return rows as Attraction[];
  }catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch attraction data.');
  }
}

export async function fetchAttractionById(id: number) {
  try {
    const conn = await getConn();
    const [rows] = await conn.query('SELECT * FROM `attraction` WHERE `attraction_id` = ?', [id]);
    return rows as Attraction[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch attraction data.');
  }
}

export async function fetchAvailabilityAttraction() {
  try {
    const conn = await getConn();
    const [rows] = await conn.query('SELECT * FROM `availability_attraction`');
    return rows as AvailabilityAttraction[];
  }catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch availability_attraction data.');
  }
}

export async function fetchInterpreterxattractionByAttractionId(attractionId: number) {
  try {
    const conn = await getConn();
    const [rows] = await conn.query(`
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