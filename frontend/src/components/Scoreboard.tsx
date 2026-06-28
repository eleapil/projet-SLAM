import { useState, useEffect } from "react";
import "./Scoreboard.css";

interface StatScore {
  id: number;
  pseudo: string;
  resultat: number;
  tentatives: number;
  duree : number;
  guess : string;
}

export default function StatsScore() {
  const [stats, setStats] = useState<StatScore[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // useEffect pour charger les données au montage du composant
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
        setStats(data);
      } catch (error: any) {
        console.error("Erreur fetch stats:", error);
        setErrorMessage("Impossible de charger les statistiques.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []); // Le tableau vide [] signifie que l'effet s'exécute une seule fois au chargement

  if (loading) {
    return <div className="stats-loading">Chargement des scores...</div>;
  }

  if (errorMessage) {
    return <div className="stats-error">{errorMessage}</div>;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 bg-gray-900 rounded-lg shadow-md text-white mt-5">
      <h2 className="text-2xl font-bold tracking-tight text-indigo-400 mb-6 text-center">
        Tableau des Scores
      </h2>

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
