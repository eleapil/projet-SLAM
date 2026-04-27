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
    const stats = rows.map((row: Record<string, unknown>) =>
      Stat.fromRow(row).toJSON(),
    );
    res.json(stats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  } finally {
    if (conn) conn.release();
  }
});

// GET /api/stats/:users_id -- Un score par son users_id
router.get("/api/stats/:users_id", async (req: Request, res: Response) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      "SELECT * FROM stats_score WHERE users_id = ?",
      [req.params.users_id],
    );
    if (rows.length === 0) {
      res.status(404).json({ error: "Stat introuvable" });
      return;
    }
    const stat = Stat.fromRow(rows[0]);
    res.json(stat.toJSON());
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  } finally {
    if (conn) conn.release();
  }
});

router.get("/api/stats/:users_id", async (req: Request, res: Response) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      "SELECT * FROM stats_score WHERE users_id = ? ORDER BY resultat DESC",
      [req.params.users_id],
    );
    if (rows.length === 0) {
      res.status(404).json({ error: "Stat introuvable" });
      return;
    }
    const stat = Stat.fromRow(rows[0]);
    res.json(stat.toJSON());
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  } finally {
    if (conn) conn.release();
  }
});

router.post("//api/stats/", async (req: Request, res: Response) => {
  let conn;
  conn = await pool.getConnection();
  const { tentatives, duree, is_win, guess, resultat } = req.body;

  await conn.query(
    `INSERT INTO stats_score( tentatives, duree, is_win, guess, resultat,
    VALUES (?,?,?,?,?)`,
    [tentatives, duree, is_win, guess, resultat]
  );
  res.status(201).json({"Nouvelle stat"})
});

export default router;
