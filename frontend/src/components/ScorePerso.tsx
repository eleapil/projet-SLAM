import { useState, useEffect } from "react";
import "./Historique.css";

interface StatScore {
  is_win: number;
  id: number;
  users_id: number;
  resultat: number;
  tentatives: number;
  duree : number;
  guess : string;
}

export default function StatsScorePerso() {
  const [stats, setStats] = useState<StatScore[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const loggedUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/stats/user/${loggedUser.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

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
  }, []);

  if (loading) {
    return <div className="hist-loading">Chargement des scores...</div>;
  }

  if (errorMessage) {
    return <div className="hist-error">{errorMessage}</div>;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 bg-gray-900 rounded-lg shadow-md text-white mt-5">
      <h2 className="text-2xl font-bold tracking-tight text-indigo-400 mb-6 text-center">
        Tableau des Scores Personnel
      </h2>

      {stats.length === 0 ? (
        <p className="hist-empty">Aucun score disponible pour le moment.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="hist-table">
            <thead>
              <tr>
                <th>Gagné</th>
                <th>Mot</th>
                <th>tentative</th>
                <th>durée</th>
                <th className="hist-cell-score">Score</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((item) => (
                <tr key={item.id}>
                  <td>{item.is_win}</td>
                  <td>{item.guess}</td>
                  <td>{item.tentatives}</td>
                  <td>{item.duree}</td>
                  <td className="hist-cell-score">{item.resultat} pts</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
