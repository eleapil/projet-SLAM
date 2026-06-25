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
