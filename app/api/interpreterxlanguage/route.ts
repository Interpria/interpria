import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { Interpreterxlanguage } from '@/app/lib/definitions';

const conn = await mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT? parseInt(process.env.MYSQL_PORT) : 3306,
});

export async function fetchInterpreterxlanguage() {
  try {
    const [rows] = await conn.query('SELECT * FROM `interpreterxlanguage`');
    return rows as Interpreterxlanguage[];
  }catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch interpreterxlanguage data.');
  }
}

