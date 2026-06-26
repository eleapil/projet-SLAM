import Header from "./Header";
import Footer from "./Footer";
import Grille from "./Grille";
import StatsScore from "./Scoreboard";
import { useState, useEffect } from "react";

function Jeu() {
  const [langueClavier, setLangueClavier] = useState("azerty");
  const [theme, setTheme] = useState("light");
  const [pageActuelle, setPageActuelle] = useState("jeu");

  //console.log("langueClavier:", langueClavier);

  // récupération des settings de l'utilisateur au montage (donc juste après connexion)
  useEffect(() => {
    async function fetchSettings() {
      try {
        const loggedUser = JSON.parse(localStorage.getItem("user"));
        if (!loggedUser) return;

        const response = await fetch(
          `http://localhost:3000/api/settings/${loggedUser.id}`,
        );

        if (response.ok) {
          const settings = await response.json();
          if (settings.theme) setTheme(settings.theme);
          if (settings.clavier) setLangueClavier(settings.clavier);
        }
      } catch (error) {
        console.error("Erreur récupération settings :", error);
      }
    }

    fetchSettings();
  }, []);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <>
      <div>
        <Header
          setLangueClavier={setLangueClavier}
          setTheme={setTheme}
          langueClavier={langueClavier}
          theme={theme}
          pageActuelle={pageActuelle}
          setPageActuelle={setPageActuelle}
        />
      </div>
      <main className="container mx-auto px-4 py-6">  
        {pageActuelle === "jeu" ? (
          <Grille langueClavier={langueClavier} />
        ) : (
          <StatsScore />
        )}
      </main>
      <div>
        <Footer />
      </div>
    </>
  );
}
export default Jeu;
