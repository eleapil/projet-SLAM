import { useState, useEffect } from "react";

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
    return <div className="text-center py-10 text-white">Chargement des scores...</div>;
  }

  if (errorMessage) {
    return <div className="text-center py-10 text-red-500">{errorMessage}</div>;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 bg-gray-900 rounded-lg shadow-md text-white mt-5">
      <h2 className="text-2xl font-bold tracking-tight text-indigo-400 mb-6 text-center">
        Tableau des Scores
      </h2>

      {stats.length === 0 ? (
        <p className="text-center text-gray-400">Aucun score disponible pour le moment.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-700 text-left text-sm">
            <thead className="bg-gray-800 text-indigo-300 uppercase text-xs tracking-wider">
              <tr>
                <th className="p-3 border-b border-gray-700">Joueur</th>
                <th className="p-3 border-b border-gray-700">Mot</th>
                <th className="p-3 border-b border-gray-700">tentative</th>
                <th className="p-3 border-b border-gray-700">durée</th>
                <th className="p-3 border-b border-gray-700 text-right">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {stats.map((item) => (
                <tr key={item.id} className="hover:bg-gray-800/50 transition-colors">
                  <td className="p-3 border-b border-gray-800 font-medium text-indigo-200">{item.pseudo}</td>
                  <td className="p-3 border-b border-gray-800 font-medium">{item.guess}</td>
                  <td className="p-3 border-b border-gray-800 font-medium">{item.tentatives}</td>
                  <td className="p-3 border-b border-gray-800 font-medium">{item.duree}</td>
                  <td className="p-3 border-b border-gray-800 text-right font-bold text-green-400">{item.resultat} pts</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}