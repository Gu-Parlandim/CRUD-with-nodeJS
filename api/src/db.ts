import { Pool } from "pg";

const db = new Pool({
  user: "postgres",
  host: "localhost",
  database: "crud",
  password: "admin",
  port: 5432,
});

export default db;
