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

export async function fetchInterpreter() {
  try {
    const [rows] = await conn.query('SELECT * FROM `interpreter`');
    return rows as Interpreter[];
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

// export async function fetchUser() {
//   const res = await fetch('http://localhost:3000/api/query', { cache: 'no-store' });
//   if (!res.ok) return [];
//   const data = await res.json();
//   return Array.isArray(data) ? data : [];
// }