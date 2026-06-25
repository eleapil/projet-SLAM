import { useState, useEffect } from "react";

export default function Profil() {
  const [email, setEmail] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [userId, setUserId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Charger les infos au démarrage
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUserId(user.id);
      setEmail(user.email);
      setPseudo(user.pseudo);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Vérification de la confirmation du mdp
    if (password && password !== confirmPassword) {
      setErrorMessage("Les nouveaux mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/users/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userId,
          email,
          pseudo,
          mdp: password || undefined, // On envoie le mdp uniquement s'il a été changé
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Profil mis à jour avec succès !");
        
        // mise a jour du localStorage
        const updatedUser = { id: userId, email, pseudo };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        
        setPassword("");
        setConfirmPassword("");
      } else {
        setErrorMessage(data.error || "Une erreur est survenue.");
      }
    } catch (error) {
      console.error("Erreur mise à jour profil:", error);
      setErrorMessage("Impossible de joindre le serveur.");
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900 text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-4 text-center text-2xl font-bold tracking-tight text-indigo-400">
          Mon Profil Mon Compte
        </h2>
        <p className="text-center text-xs text-gray-400 mt-1">
          Laissez le mot de passe vide si vous ne souhaitez pas le modifier.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm bg-gray-800 p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Messages de retour */}
          {errorMessage && <div className="text-sm bg-red-900/50 text-red-400 p-2 rounded border border-red-800 text-center">{errorMessage}</div>}
          {successMessage && <div className="text-sm bg-green-900/50 text-green-400 p-2 rounded border border-green-800 text-center">{successMessage}</div>}

          <div>
            <label className="block text-sm font-medium text-gray-300">Pseudo</label>
            <input
              type="text"
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
              required
              className="mt-1 block w-full rounded-md bg-gray-700 border-none px-3 py-1.5 text-white focus:outline-2 focus:outline-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Adresse Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full rounded-md bg-gray-700 border-none px-3 py-1.5 text-white focus:outline-2 focus:outline-indigo-500 sm:text-sm"
            />
          </div>

          <hr className="border-gray-700 my-4" />

          {/* Nouveau mdp */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Nouveau mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1 block w-full rounded-md bg-gray-700 border-none px-3 py-1.5 text-white placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm"
            />
          </div>

          {/* Confirmer le mdp */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Confirmer le mot de passe</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1 block w-full rounded-md bg-gray-700 border-none px-3 py-1.5 text-white placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-indigo-500"
            >
              Enregistrer les modifications
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}