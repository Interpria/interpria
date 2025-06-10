import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const conn = await mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT? parseInt(process.env.MYSQL_PORT) : 3306,
})

import { User, Language, Attraction, Interpreter, Interpreterxlanguage, Interpreterxattraction, AvailabilityAttraction, Booking, AvailabilityInterpreter } from './definitions';

export async function fetchUser() {
  try {   
    const [rows] = await conn.query('SELECT * FROM `user`');
    return rows as User[];
  }catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch user data.');
  }
}

export async function fetchUserById(id: number) {
  try {
    const [rows] = await conn.query('SELECT * FROM `user` WHERE `user_id` = ?', [id]);
    return rows as User[];
  }catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch user data.');
  }
}

export async function fetchLanguage() {
  try {
    const [rows] = await conn.query('SELECT * FROM `language`');
    return rows as Language[];
  }catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch language data.');
  }
}

export async function fetchAttraction() {
  try {
    const [rows] = await conn.query('SELECT * FROM `attraction`');
    return rows as Attraction[];
  }catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch attraction data.');
  }
}

export async function fetchAttractionById(id: number) {
  try {
    const [rows] = await conn.query('SELECT * FROM `attraction` WHERE `attraction_id` = ?', [id]);
    return rows as Attraction[];
  }catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch attraction data.');
  }
}

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

export async function fetchInterpreterxattractionByInterpreterId(interpreterId: number) {
  try {
    const [rows] = await conn.query(`
      SELECT 
        ixa.*,
        a.name as attraction_name
      FROM interpreterxattraction ixa
      LEFT JOIN attraction a ON ixa.attraction_id = a.attraction_id
      WHERE ixa.interpreter_id = ?
    `, [interpreterId]);
    return rows as (Interpreterxattraction & { attraction_name: string })[];
  }catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch interpreterxattraction data.');
  }
}

export async function fetchInterpreterxattractionByAttractionId(attractionId: number) {
  try {
    const [rows] = await conn.query('SELECT * FROM `interpreterxattraction` WHERE `attraction_id` = ?', [attractionId]);
    return rows as Interpreterxattraction[];
  }catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch interpreterxattraction data.');
  }
}

export async function fetchAvailabilityInterpreterByInterpreterId(id: number) {
  try {
    const [rows] = await conn.query('SELECT * FROM `availability_interpreter` WHERE `interpreter_id` = ?', [id]);
    return rows as AvailabilityInterpreter[];
  }catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch interpreter data.');
  }
}

export async function fetchInterpreterxlanguage() {
  try {
    const [rows] = await conn.query('SELECT * FROM `interpreterxlanguage`');
    return rows as Interpreterxlanguage[];
  }catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch interpreterxlanguage data.');
  }
}

export async function fetchInterpreterxattraction() {

  try {
    const [rows] = await conn.query('SELECT * FROM `interpreterxattraction`');
    return rows as Interpreterxattraction[];
  }catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch interpreterxattraction data.');
  }
}

export async function fetchAvailabilityAttraction() {
  try {
    const [rows] = await conn.query('SELECT * FROM `availability_attraction`');
    return rows as AvailabilityAttraction[];
  }catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch availability_attraction data.');
  }
}

export async function fetchAvailabilityInterpreter() {
  try {
    const [rows] = await conn.query('SELECT * FROM `availability_interpreter`');
    return rows as AvailabilityInterpreter[];
  }catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch availability_interpreter data.');
  }
}

export async function fetchBooking() {
  try {
    const [rows] = await conn.query('SELECT * FROM `booking`');
    return rows as Booking[];
  }catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch booking data.');
  }
}