import { Router, Request, Response } from "express";
import pool from "../db";
import { Setting } from "../models/Setting";

const router = Router();

// GET /api/settings -- Liste de tous les settings
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

// GET /api/settings/:userId -- Settings d'un utilisateur précis
router.get("/:userId", async (req: Request, res: Response) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const { userId } = req.params;

    const rows = await conn.query("SELECT * FROM settings WHERE users_id = ?", [
      userId,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Aucun settings trouvé" });
    }

    const setting = Setting.fromRow(rows[0]).toJSON();
    res.json(setting);
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
    const { users_id, theme, clavier } = req.body;

    await conn.query(
      `INSERT INTO settings (users_id, theme, clavier)
   VALUES (?, ?, ?)
   ON DUPLICATE KEY UPDATE
   theme = VALUES(theme),
   clavier = VALUES(clavier)`,
      [users_id, theme, clavier],
    );

    res.status(201).json({ message: "Nouveaux settings" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  } finally {
    if (conn) conn.release();
  }
});

export default router;
