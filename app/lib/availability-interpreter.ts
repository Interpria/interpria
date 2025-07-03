import { AvailabilityInterpreter } from '@/app/lib/definitions';
import pool from '@/app/lib/db';

export async function fetchAvailabilityInterpreter() {
  try {
    const [rows] = await pool.query('SELECT * FROM `availability_interpreter`');
    return rows as AvailabilityInterpreter[];
  }catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch availability_interpreter data.');
  }
}

export async function fetchAvailabilityInterpreterByInterpreterId(id: number) {
  try {
    const [rows] = await pool.query(`
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

