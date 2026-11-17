import express from "express";
import { neon } from "@neondatabase/serverless";
import "dotenv/config";

const sql = neon(process.env.DATABASE_URL);
const app = express();
const port = 3001;

app.get("/", async (req, res) => {
  const result = await sql`SELECT * FROM movies`;
  console.log(result);
  res.json(result);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
