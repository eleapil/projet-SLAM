import Header from "./Header";
import Footer from "./Footer";
import Grille from "./Grille";
import { useState, useEffect } from "react";

function Jeu() {
  const [langueClavier, setLangueClavier] = useState("azerty");
  const [theme, setTheme] = useState("light");

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
        />
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
