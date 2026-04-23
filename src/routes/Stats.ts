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

// GET /api/stats/:id -- Un score par son users_id
router.get("/:id", async (req: Request, res: Response) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      "SELECT * FROM stats_score WHERE users_id = ?",
      [req.params.id],
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

export default router;
