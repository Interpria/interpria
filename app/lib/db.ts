import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.secrets.MYSQL_HOST,
  user: process.secrets.MYSQL_USER,
  password: process.secrets.MYSQL_PASSWORD,
  database: process.secrets.MYSQL_DATABASE,
  port: process.secrets.MYSQL_PORT ? parseInt(process.secrets.MYSQL_PORT) : 3306,
  waitForConnections: true,
  connectionLimit: 20, // adjust as needed
  queueLimit: 0,
});

export default pool;