import "./Grille.css";
import { useRef, useState, useEffect } from "react";
import Victoire from "./Victoire";
import Defaite from "./Defaite";
import Clavier from "./Clavier";
import ClavierQ from "./ClavierQ";

//taille de notre grille
const lignes = 6;
const colonnes = 5;

export default function Grille({ langueClavier }: any) {
  const [victoire, setVictoire] = useState(false);
  const [defaite, setDefaite] = useState(false);
  const [ligneActive, setLigneActive] = useState(0);
  const inputsRef = useRef(new Map());
  const [colonneActive, setColonneActive] = useState(0);
  const [presence, setPresence] = useState({}); //juste, mvPlacement absent

  const setRef = (ligne: number, col: number) => (el: any) => {
    const key = `${ligne}-${col}`;
    if (el) inputsRef.current.set(key, el);
    else inputsRef.current.delete(key);
  };

  const focusCell = (ligne: number, col: number) => {
    const cell = inputsRef.current.get(`${ligne}-${col}`);
    if (cell) cell.focus();
  };

  const handleChange = (ligne: number, col: number) => (e: any) => {
    let value = e.target.value.slice(-1).toUpperCase();

    //pouvoir écrire que lettres et pas symboles
    if (!/^[A-Z]$/.test(value)) {
      value = "";
    }

    e.target.value = value;
    setColonneActive(col);

    if (value && col < colonnes - 1) {
      focusCell(ligne, col + 1);
      setColonneActive(col + 1);
    }
  };
  //focus sur la premiere case au lancement de la page
  useEffect(() => {
    focusCell(0, 0);
  }, []);
  //passe le focus direct à la ligne suivante
  useEffect(() => {
    focusCell(ligneActive, 0);
  }, [ligneActive]);

  const handleKeyDown = (ligne: number, col: number) => async (e: any) => {
    //touche "supp"
    if (e.key === "Backspace" && !e.target.value && col > 0) {
      focusCell(ligne, col - 1);
    }

    if (e.key === "Enter" && col === colonnes - 1 /*car colonnes de 0 à 4*/) {
      //touche "enter"
      let motEssai = recupMotLigne(ligne);
      //pouvoir valider seulement si on ecrit 5 lettres
      if (motEssai.length === colonnes) {
        const comparaison = await motExistant(motEssai);

        //affichage rouge quand mot n'existe pas
        if (!comparaison) {
          for (let c = 0; c < colonnes; c++) {
            const input = inputsRef.current.get(`${ligne}-${c}`);
            input.classList.add("erreur");
          }

          setTimeout(() => {
            for (let c = 0; c < colonnes; c++) {
              const input = inputsRef.current.get(`${ligne}-${c}`);
              input.classList.remove("erreur");
            }
          }, 1000);

          return;
        }

        //fonction qui compare avec mot que l'on a fetch de l'api
        verifierResultat(motEssai, ligne);
        //passer à la ligne suivante
        setLigneActive((prev) => {
          const ligneSuivante = prev + 1;

          //si on arrive à la derniere ligne => defaite
          if (ligneSuivante === lignes) {
            setTimeout(() => {
              setDefaite(true);
            }, 500);
          }
          return ligneSuivante;
        });

        setColonneActive(0);
      }
    }
  };

  //clavier virtuel
  const handleKeyVirt = async (key: string, ligne: number, col: number) => {
    const input = inputsRef.current.get(`${ligne}-${col}`);

    if (/^[A-Z]$/.test(key)) {
      input.value = key;

      if (col < colonnes - 1) {
        focusCell(ligne, col + 1);
        setColonneActive(col + 1);
      }
    }

    //touche "supp" virtuelle

    if (key === "Backspace") {
      if (input.value) {
        input.value = "";
      } else if (col > 0) {
        const newCol = col - 1;
        const prevInput = inputsRef.current.get(`${ligne}-${newCol}`);

        prevInput.value = "";
        focusCell(ligne, newCol);
        setColonneActive(newCol);
      }
    }

    if (key === "Enter" && col === colonnes - 1 /*car colonnes de 0 à 4*/) {
      //touche "enter" virtuelle
      let motEssai = recupMotLigne(ligne);
      //pouvoir valider seulement si on ecrit 5 lettres
      if (motEssai.length === colonnes) {
        const comparaison = await motExistant(motEssai);
        if (!comparaison) {
          for (let c = 0; c < colonnes; c++) {
            const input = inputsRef.current.get(`${ligne}-${c}`);
            input.classList.add("erreur");
          }

          setTimeout(() => {
            for (let c = 0; c < colonnes; c++) {
              const input = inputsRef.current.get(`${ligne}-${c}`);
              input.classList.remove("erreur");
            }
          }, 1000);

          return;
        }
        //fonction qui compare avec mot que l'on a fetch de l'api
        verifierResultat(motEssai, ligne);
        //passer à la ligne suivante
        setLigneActive((prev) => {
          const ligneSuivante = prev + 1;

          //si on arrive à la derniere ligne => defaite
          if (ligneSuivante === lignes) {
            setTimeout(() => {
              setDefaite(true);
            }, 500);
          }
          return ligneSuivante;
        });
        setColonneActive(0);
      }
    }
  };

  //mot à trouver parmi la liste que l'on fetch sur datamuse.com
  //ancienne api que je garde en cas de prob
  /*   async function motSecret() {

    const response = await fetch("https://api.datamuse.com/words?sp=?????");

    const mots = await response.json();

    //console.log(mots);

    //1 mot parmi la liste
    const motAleatoire = Math.floor(Math.random() * mots.length);
    return mots[motAleatoire].word.toUpperCase();
  } */

  //api sur wordnik.com => Demander une clé pour pouvoir l'utiliser
  async function motSecret() {
    const keywordnik = import.meta.env.VITE_WORDNIK_KEY;

    const response = await fetch(
      `https://api.wordnik.com/v4/words.json/randomWords?limit=1&minLength=5&maxLength=5&api_key=${keywordnik}`,
    );
    const data = await response.json();
    const mot = data[0].word.toUpperCase();

    if (mot.includes("'") || mot.includes("-") || mot.includes("ö")) {
      return motSecret();
    }
    return mot;
  }

  const [secret, setSecret] = useState("");
  useEffect(() => {
    motSecret().then(setSecret);
  }, []);

  // juste pour afficher le mot à toruver dans la console pour vérifier que tout fonctionne
  useEffect(() => {
    console.log("Mot secret :", secret);
  }, [secret]);

  //on recup le mot de notre ligne pour pouvoir le comparer ensuite
  function recupMotLigne(ligne: number) {
    let mot = "";
    for (let col = 0; col < colonnes; col++) {
      const input = inputsRef.current.get(`${ligne}-${col}`);
      mot += input.value;
    }
    return mot;
  }

  async function motExistant(mot: string) {
    const verif = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${mot}`,
    );
    return verif.ok;
  }

  function verifierResultat(mot: string, ligne: number) {
    //transforme mot juste en chaque lettre juste
    let lettresJustes = secret.split("");
    const newStateLettre = { ...presence };

    for (let col = 0; col < colonnes; col++) {
      const input = inputsRef.current.get(`${ligne}-${col}`);

      if (mot[col] === lettresJustes[col]) {
        input.classList.add("juste");
        //lettre présente mais mal placée
        lettresJustes[col] = null;
        newStateLettre[mot[col]] = "juste";
      }
    }
    for (let col = 0; col < colonnes; col++) {
      const input = inputsRef.current.get(`${ligne}-${col}`);

      if (input.classList.contains("juste")) continue;
      const index = lettresJustes.indexOf(mot[col]);

      if (index !== -1) {
        input.classList.add("mvPlacement");
        lettresJustes[index] = null;

        if (newStateLettre[mot[col]] !== "juste") {
          newStateLettre[mot[col]] = "mvPlacement";
        }
      } else {
        input.classList.add("absent");

        if (!newStateLettre[mot[col]]) {
          newStateLettre[mot[col]] = "absent";
        }
      }
    }

    setPresence(newStateLettre);

    //réponse trouvé
    if (mot === secret) {
      setTimeout(() => {
        setVictoire(true);
      }, 500);
    }
  }

  //pour relancer une partie sans avoir à refresh la page entière
  function rejouer() {
    setVictoire(false);
    setDefaite(false);
    setLigneActive(0);
    setPresence({});

    for (let input of inputsRef.current.values()) {
      //enleve les classlist de la partie précédente
      input.value = "";
      input.classList.remove("absent");
      input.classList.remove("mvPlacement");
      input.classList.remove("juste");
    }
    //remet le focus a la premiere case
    focusCell(0, 0);
    //fetch un nouveau mot secret
    motSecret().then(setSecret);
  }
  //affichage de la grille
  return (
    <div className="ligne">
      {/* affichage du popup de victoire */}
      {victoire && (
        <Victoire
          open={victoire}
          setOpen={setVictoire}
          mot={secret}
          rejouer={rejouer}
        />
      )}
      {/* affichage du popup de defaite */}
      {defaite && (
        <Defaite
          open={defaite}
          setOpen={setDefaite}
          mot={secret}
          rejouer={rejouer}
        />
      )}
      {Array.from({ length: lignes }).map((_, ligne) => (
        <div className="colonne" key={ligne}>
          {Array.from({ length: colonnes }).map((_, col) => (
            <input
              className="case"
              key={`${ligne}-${col}`}
              ref={setRef(ligne, col)}
              maxLength={1}
              disabled={ligne !== ligneActive}
              onChange={handleChange(ligne, col)}
              onKeyDown={handleKeyDown(ligne, col)}
            />
          ))}
        </div>
      ))}
      {langueClavier === "azerty" ? (
        <Clavier
          onKeyPress={(key: any) =>
            handleKeyVirt(key, ligneActive, colonneActive)
          }
          presence={presence}
        />
      ) : (
        <ClavierQ
          onKeyPress={(key: any) =>
            handleKeyVirt(key, ligneActive, colonneActive)
          }
          presence={presence}
        />
      )}
    </div>
  );
}
