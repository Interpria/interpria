import mysql from 'mysql2/promise';
import { AvailabilityInterpreter } from '@/app/lib/definitions';

const conn = await mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT? parseInt(process.env.MYSQL_PORT) : 3306,
});

export async function fetchAvailabilityInterpreter() {
  try {
    const [rows] = await conn.query('SELECT * FROM `availability_interpreter`');
    return rows as AvailabilityInterpreter[];
  }catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch availability_interpreter data.');
  }
}

export async function fetchAvailabilityInterpreterByInterpreterId(id: number) {
  try {
    const [rows] = await conn.query(`
      SELECT
        ai.*,
        a.attraction_id as attraction_id
      FROM availability_interpreter ai
      LEFT JOIN attraction a ON ai.attraction_id = a.attraction_id
      WHERE ai.interpreter_id = ? 
    `, [id]);
    return rows as (AvailabilityInterpreter & { attraction_id: number })[];
  }catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch interpreter data.');
  }
}

