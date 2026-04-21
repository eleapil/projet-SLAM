import mariadb from "mariadb";
import dotenv from "dotenv";

dotenv.config();

const pool = mariadb.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 8081,
  user: process.env.DB_USER || "etudiant",
  password: process.env.DB_PASSWORD || "etudiant",
  database: process.env.DB_NAME || "wordle_db",
  connectionLimit: 10,
});

export default pool;
