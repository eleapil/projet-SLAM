import { Router, Request, Response } from "express";
import pool from "../db";
import { User } from "../models/User";

const router = Router();

// GET /api/stats -- Liste de tous les scores
router.get("/", async (_req: Request, res: Response) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM users");
    const stats = rows.map((row: any) => User.fromRow(row).toJSON());
    res.json(stats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  } finally {
    if (conn) conn.release();
  }
});

// GET /api/stats/:users_id -- les scores par son users_id

router.get("/:users_id", async (_req: Request, res: Response) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM users WHERE users_id = ?");
    [_req.params.users_id];
    const stats = rows.map((row: any) => User.fromRow(row).toJSON());
    res.json(stats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  } finally {
    if (conn) conn.release();
  }
});

router.post("/", async (_req: Request, res: Response) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const { nom, prenom, email, pseudo, mdp } = _req.body;

    await conn.query(
      `INSERT INTO users ( nom, prenom, email, pseudo, mdp)
      VALUES (?,?,?,?,?)`,
      [nom, prenom, email, pseudo, mdp],
    );
    [_req.params.users_id];
    res.status(201).json({ message: "Nouvel user" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  } finally {
    if (conn) conn.release();
  }
});

export default router;
