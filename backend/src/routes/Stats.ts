import { Router, Request, Response } from "express";
import pool from "../db";
import { Stat } from "../models/Stat_score";

const router = Router();

// GET liste de tous les scores
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

// GET les scores par son users_id

router.get("/user/:users_id", async (_req: Request, res: Response) => {
  let conn;
  try {
    conn = await pool.getConnection();
    
    const {users_id} = _req.params;
    const rows = await conn.query(
      "SELECT * FROM stats_score WHERE users_id = ?", [users_id]
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

// Get les scores trié par scrore décroissant
router.get("/high", async (_req: Request, res: Response) => {
  let conn;
  try {
    conn = await pool.getConnection();
    
    // Jointure (INNER JOIN) pour lier le score à l'utilisateur
    const query = `
      SELECT s.*, u.pseudo 
      FROM stats_score s
      INNER JOIN users u ON s.users_id = u.id
      ORDER BY s.resultat DESC LIMIT 15
    `;
    
    const rows = await conn.query(query);

    // On convertit via le modèle puis on ajoute la propriété pseudo au JSON envoyé
    const stats = rows.map((row: any) => {
      const baseStatJson = Stat.fromRow(row).toJSON();
      return {
        ...baseStatJson,
        pseudo: row.pseudo
      };
    });

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
    const { users_id, tentatives, duree, is_win, guess, resultat } = _req.body;

    await conn.query(
      `INSERT INTO stats_score
   (users_id, tentatives, duree, is_win, guess, resultat)
   VALUES (?, ?, ?, ?, ?, ?)`,
      [users_id, tentatives, duree, is_win, guess, resultat],
    );
    [_req.params.users_id];
    res.status(201).json({ message: "Nouvelle stat" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  } finally {
    if (conn) conn.release();
  }
});

export default router;
