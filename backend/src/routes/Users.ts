import { Router, Request, Response } from "express";
import pool from "../db";
import { User } from "../models/User";
import bcrypt from "bcrypt";

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

// POST /api/users/login -- Connexion de l'utilisateur
router.post("/login", async (req: Request, res: Response) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const { email, mdp } = req.body;

    const rows = await conn.query("SELECT * FROM users WHERE email = ?", [email]);
    
    if (rows.length === 0) {
      return res.status(401).json({ error: "Identifiants incorrects" });
    }

    const user = rows[0];

    // Vérification du mot de passe haché
const isPasswordValid = await bcrypt.compare(mdp, user.mdp);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Identifiants incorrects" });
    }

    res.json({ 
      message: "Connexion réussie !", 
      user: { id: user.id, pseudo: user.pseudo, email: user.email } 
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  } finally {
    if (conn) conn.release();
  }
});

// GET /api/users/:id -- Obtenir un utilisateur par son ID
router.get("/:id", async (req: Request, res: Response) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM users WHERE id = ?", [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
    
    const stats = rows.map((row: any) => User.fromRow(row).toJSON());
    res.json(stats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  } finally {
    if (conn) conn.release();
  }
});

// POST /api/users -- Inscription d'un utilisateur
router.post("/", async (req: Request, res: Response) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const { nom, prenom, email, pseudo, mdp } = req.body;

    // Verification si user existe
    const existingUsers = await conn.query("SELECT id FROM users WHERE email = ?", [email]);
    if (existingUsers.length > 0) {
      return res.status(409).json({ error: "Cette adresse email est déjà utilisée." });
    }
const saltRounds = 10;
    const hachemdp = await bcrypt.hash(mdp, saltRounds);
    // creation d'un user
    await conn.query(
      `INSERT INTO users (nom, prenom, email, pseudo, mdp) VALUES (?, ?, ?, ?, ?)`,
      [nom, prenom, email, pseudo, hachemdp]
    );

    res.status(201).json({ message: "Nouvel utilisateur créé avec succès !" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  } finally {
    if (conn) conn.release();
  }
});

// PUT - modification des données user
router.put("/update-profile", async (req: Request, res: Response) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const { id, email, pseudo, mdp } = req.body;

    if (!id) {
      return res.status(400).json({ error: "ID utilisateur manquant." });
    }

    // 1. Vérifier si le nouvel email est déjà utilisé par un AUTRE utilisateur
    const existingUsers = await conn.query(
      "SELECT id FROM users WHERE email = ? AND id != ?", 
      [email, id]
    );
    if (existingUsers.length > 0) {
      return res.status(409).json({ error: "Cette adresse email est déjà utilisée par un autre compte." });
    }

    // 2. Mettre à jour les infos en BDD
    if (mdp) {
      // Si l'utilisateur a tapé un nouveau mot de passe, on le hache avec bcrypt
      const saltRounds = 10;
      const hashedMdp = await bcrypt.hash(mdp, saltRounds);

      await conn.query(
        "UPDATE users SET email = ?, pseudo = ?, mdp = ? WHERE id = ?",
        [email, pseudo, hashedMdp, id]
      );
    } else {
      // Si le champ mdp est resté vide, on met à jour uniquement l'email et le pseudo
      await conn.query(
        "UPDATE users SET email = ?, pseudo = ? WHERE id = ?",
        [email, pseudo, id]
      );
    }

    res.json({ message: "Profil mis à jour avec succès !" });

  } catch (err) {
    console.error("Erreur bdd update-profile:", err);
    res.status(500).json({ error: "Erreur serveur lors de la mise à jour." });
  } finally {
    if (conn) conn.release();
  }
});

export default router;
