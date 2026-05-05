import { Router, Request, Response } from "express";
import pool from "../db";
import { Setting } from "../models/Setting";

const router = Router();

// GET /api/stats -- Liste de tous les settings
router.get("/", async (_req: Request, res: Response) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM settings");
    const settings = rows.map((row: any) => Setting.fromRow(row).toJSON());
    res.json(settings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  } finally {
    if (conn) conn.release();
  }
});

router.post("/c", async (req: Request, res: Response) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const { theme } = req.body;

    await conn.query(
      `INSERT INTO settings( theme )
      VALUES (?)`,
      [theme],
    );
    res.status(201).json({ message: "Nouveau settings" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  } finally {
    if (conn) conn.release();
  }
});

export default router;
