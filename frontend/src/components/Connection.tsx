import { useState } from "react";
import "./ConnecInscrip.css";

interface UnionConnectionProps {
  setIsConnection: (bool: boolean) => void;
  setIsConnected: (bool: boolean) => void;
}

export default function Connection({
  setIsConnection,
  setIsConnected,
}: UnionConnectionProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(""); // Réinitialise l'erreur à chaque tentative

    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ email, mdp: password }),
      });

      const data = await response.json();

      if (response.ok) {
        //alert("Connexion réussie !");

        // 3. Sauvegarde de l'utilisateur dans le localStorage
        localStorage.setItem("user", JSON.stringify(data.user));
        console.log("Utilisateur connecté :", data.user);
        setIsConnected(true);
      } else {
        setErrorMessage(
          data.error || "Une erreur est survenue lors de la connexion.",
        );
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      setErrorMessage("Impossible de joindre le serveur.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Connexion</h2>

        {/* ERREUR */}
        {errorMessage && <div className="auth-error">{errorMessage}</div>}

        <form onSubmit={handleSubmit}>
          <label className="auth-label">Adresse Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="auth-input"
          />

          <label className="auth-label">Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="auth-input"
          />

          <button type="submit" className="auth-button">
            Se connecter
          </button>

          <a
            href="#"
            onClick={() => setIsConnection(false)}
            className="auth-link"
          >
            Pas de compte ?
          </a>
        </form>
      </div>
    </div>
  );
}
