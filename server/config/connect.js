import { createPool } from "mysql";
import dotenv from "dotenv";
dotenv.config();

const pool = createPool({
  multipleStatements: true,
  host: "localhost",
  user: "root",
  password: "1234",
  connectionLimit: 10,
  database: "list",
  port: "3307",
});