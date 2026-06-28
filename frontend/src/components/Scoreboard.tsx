import { useState, useEffect } from "react";
import "./Scoreboard.css";

// 1. structure ligne stat
interface StatScore {
  id: number;
  users_id: number;
  resultat: number;
  tentatives: number;
  duree: number;
  guess: string;
}

export default function StatsScore() {
  const [stats, setStats] = useState<StatScore[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // 2. useEffect pour charger les données au montage du composant
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/stats/high", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Erreur serveur : ${response.status}`);
        }

        const data = await response.json();
        setStats(data); // On stocke le tableau reçu du backend
      } catch (error: any) {
        console.error("Erreur fetch stats:", error);
        setErrorMessage("Impossible de charger les statistiques.");
      } finally {
        setLoading(false); // Le chargement est terminé (succès ou échec)
      }
    };

    fetchStats();
  }, []); // Le tableau vide [] signifie que l'effet s'exécute une seule fois au chargement

  // 3.(Chargement / Erreur)
  if (loading) {
    return <div className="stats-loading">Chargement des scores...</div>;
  }

  if (errorMessage) {
    return <div className="stats-error">{errorMessage}</div>;
  }

  // affichage stats
  return (
    <div className="stats-container">
      <h2 className="stats-title">🏆 Tableau des Scores</h2>

      {stats.length === 0 ? (
        <p className="stats-empty">Aucun score disponible pour le moment.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="stats-table">
            <thead>
              <tr>
                <th>ID Joueur</th>
                <th>Mot</th>
                <th>tentative</th>
                <th>durée</th>
                <th className="stats-cell-score">Score</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((item) => (
                <tr key={item.id}>
                  <td>{item.users_id}</td>
                  <td>{item.guess}</td>
                  <td>{item.tentatives}</td>
                  <td>{item.duree}</td>
                  <td className="stats-cell-score">{item.resultat} pts</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
