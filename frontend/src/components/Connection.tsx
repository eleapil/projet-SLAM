import { useState } from "react";

interface UnionConnectionProps {
  setIsConnection: (bool: boolean) => void;
  setIsConnected: (bool: boolean) => void;
}

export default function Connection({ setIsConnection, setIsConnected }: UnionConnectionProps) {

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
        setErrorMessage(data.error || "Une erreur est survenue lors de la connexion.");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      setErrorMessage("Impossible de joindre le serveur.");
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 palette-bg-gris">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
            Connexion à votre compte
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {/* BLOC D'AFFICHAGE DE L'ERREUR */}
          {errorMessage && (
            <div className="mb-4 p-3 rounded-md bg-red-500/20 border border-red-500 text-red-200 text-sm font-medium">
              {errorMessage}
            </div>
          )}

          {/* AJOUT DE onSubmit SUR LE FORMULAIRE */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-black">
                Adresse Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email} // Composant contrôlé
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-black">
                  Mot de passe
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Se connecter
              </button>
            </div>
          </form>

          <div className="mt-4 text-center">
            <a
              href="#"
              onClick={() => setIsConnection(false)}
              className="font-semibold text-indigo-400 hover:text-indigo-300"
            >
              Pas de compte ?
            </a>
          </div>
        </div>
      </div>
    </>
  );
}