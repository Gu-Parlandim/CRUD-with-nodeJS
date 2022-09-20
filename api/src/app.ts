import express, { Request, Response, NextFunction, json } from "express";
import db from "./db";
import cors from "cors";

const app = express();
app.use(cors());
app.use(json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get(
  "/dados/get",
  async (req: Request, res: Response, next: NextFunction) => {
    const query = "select * from dados  ORDER BY id;";
    const { rows } = await db.query(query);
    res.status(200).json(rows);
  }
);

app.post(
  "/dados/create",
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, password } = req.body;
    console.log(req.body);
    const query = `INSERT INTO dados (name, password) VALUES ($1, $2) RETURNING *;`;
    const { rows } = await db.query(query, [name, password]);
    res.status(201).json(rows[0]);
  }
);

app.put(
  "/dados/update/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, password } = req.body;
    const { id } = req.params;
    const query = `UPDATE dados set name = $1, password = $2 WHERE id = $3 RETURNING *;`;
    const { rows } = await db.query(query, [name, password, id]);
    res.status(200).json(rows[0]);
  }
);

app.delete(
  "/dados/delete/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const query = `DELETE FROM dados WHERE id = $1`;
    const { rows } = await db.query(query, [id]);
    res.status(203).json({ status: "sucess" });
  }
);

app.listen(3000, () => {
  console.log(`server on port: ${3000}`);
});
