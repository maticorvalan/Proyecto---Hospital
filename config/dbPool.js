// config/dbPool.js
import mysql from 'mysql2/promise';
import 'dotenv/config';

// Este pool es EXCLUSIVAMENTE para el almacén de sesiones.
const dbPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 1,
  queueLimit: 0
});

export default dbPool;