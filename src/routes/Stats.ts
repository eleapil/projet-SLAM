import { Router, Request, Response } from "express";
import pool from "../db";
import { Stat } from "../models/Stat_score";

const router = Router();

// GET /api/stats -- Liste de tous les scores
router.get("/", async (_req: Request, res: Response) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM stats_score");
    const stats = rows.map((row: any) => Stat.fromRow(row).toJSON());
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
    const rows = await conn.query(
      "SELECT * FROM stats_score WHERE users_id = ?",
    );
    [_req.params.users_id];
    const stats = rows.map((row: any) => Stat.fromRow(row).toJSON());
    res.json(stats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  } finally {
    if (conn) conn.release();
  }
});

router.get("/:users_id/high", async (_req: Request, res: Response) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      "SELECT * FROM stats_score WHERE users_id = ? ORDER BY resultat DESC",
    );
    [_req.params.users_id];
    const stats = rows.map((row: any) => Stat.fromRow(row).toJSON());
    res.json(stats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  } finally {
    if (conn) conn.release();
  }
});

router.post("/", async (req: Request, res: Response) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const { tentatives, duree, is_win, guess, resultat } = req.body;

    await conn.query(
      `INSERT INTO stats_score( tentatives, duree, is_win, guess, resultat)
      VALUES (?,?,?,?,?)`,
      [tentatives, duree, is_win, guess, resultat],
    );
    res.status(201).json({ message: "Nouvelle stat" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  } finally {
    if (conn) conn.release();
  }
});

export default router;
