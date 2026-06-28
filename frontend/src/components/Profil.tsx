import { useState, useEffect } from "react";
import "./Profil.css";

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
      const response = await fetch(
        "http://localhost:3000/api/users/update-profile",
        {
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
        },
      );

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
    <div className="profil-container">
      <h2 className="profil-title">Mon Profil Mon Compte</h2>
      <p className="profil-subtitle">
        Laissez le mot de passe vide si vous ne souhaitez pas le modifier.
      </p>

      <div className="profil-card">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Messages de retour */}
          {errorMessage && <div className="profil-error">{errorMessage}</div>}
          {successMessage && (
            <div className="profil-success">{successMessage}</div>
          )}

          <div>
            <label className="profil-label">Pseudo</label>
            <input
              type="text"
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
              required
              className="profil-input"
            />
          </div>

          <div>
            <label className="profil-label">Adresse Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="profil-input"
            />
          </div>

          <hr className="profil-hr" />

          {/* Nouveau mdp */}
          <div>
            <label className="profil-label">Nouveau mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="profil-input"
            />
          </div>

          {/* Confirmer le mdp */}
          <div>
            <label className="profil-label">Confirmer le mot de passe</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="profil-input"
            />
          </div>

          <div className="pt-2">
            <button type="submit" className="profil-button">
              Enregistrer les modifications
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
