import Header from "./Header";
import Footer from "./Footer";
import Grille from "./Grille";
import { useState } from "react";

function Jeu() {
  const [langueClavier, setLangueClavier] = useState("azerty");
  const [theme, setTheme] = useState("Clair");

  return (
    <>
      <div>
        <Header setLangueClavier={setLangueClavier} />
      </div>
      <div>
        <Grille langueClavier={langueClavier} />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
export default Jeu;
