import { useState } from "react";
import "./ConnecInscrip.css";

interface ConnectionProps {
  setIsConnection: (bool: boolean) => void;
}

export default function Inscription({ setIsConnection }: ConnectionProps) {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  
  const [errorMessage, setErrorMessage] = useState("");

  // soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(""); // Réinitialise l'erreur à chaque tentative

    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nom, prenom, email, pseudo, mdp: password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Inscription validée !");

        setEmail("");
        setPassword("");
        setNom("");
        setPrenom("");
        setPseudo("");

        setIsConnection(true);
      } else {

        setErrorMessage(data.error || "Une erreur est survenue.");
        console.error("Une erreur est survenue :", data.error);
      }
    } catch (error) {
      // Gestion d'une erreur réseau
      setErrorMessage("Impossible de contacter le serveur.");
      console.error("Erreur lors de la requête :", error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Créer un compte</h2>

        {errorMessage && (
          <div className="auth-error-message" style={{ color: "red", marginBottom: "15px", textAlign: "center", fontWeight: "bold" }}>
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label className="auth-label">Nom</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
            className="auth-input"
          />

          <label className="auth-label">Prénom</label>
          <input
            type="text"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            required
            className="auth-input"
          />

          <label className="auth-label">Adresse Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="auth-input"
          />

          <label className="auth-label">Pseudo</label>
          <input
            type="text"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            required
            className="auth-input"
          />

          <label className="auth-label">Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="auth-input"
          />

          <button type="submit" className="auth-button">
            S'inscrire
          </button>

          <a
            href="#"
            onClick={() => setIsConnection(true)}
            className="auth-link"
          >
            Déjà un compte ?
          </a>
        </form>
      </div>
    </div>
  );
}