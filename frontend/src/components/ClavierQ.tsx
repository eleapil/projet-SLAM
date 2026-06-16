import "./Clavier.css";

export default function ClavierQ({ onKeyPress, presence }: any) {
  const azerty = ["QWERTYUIOP", "ASDFGHKL", "↵ZXCVBNM⌫"];

  //ajout d'une classe differente pour ces deux touches pour le css
  const classLettre = (lettre: string) => {
    if (lettre === "⌫") {
      return "lettre supp";
    } else if (lettre === "↵") {
      return "lettre entre";
    }
    const etat = presence[lettre];

    return `lettre ${etat || ""}`;
  };

  return (
    <div className="clavier">
      {azerty.map((lignes, index) => (
        <div key={index} className="ligneClav ">
          {" "}
          {lignes.split("").map((lettre, i) => (
            <button
              key={i}
              className={classLettre(lettre)}
              onClick={() => {
                if (lettre === "⌫") {
                  onKeyPress("Backspace");
                } else if (lettre === "↵") {
                  onKeyPress("Enter");
                } else {
                  onKeyPress(lettre);
                }
              }}
            >
              {lettre}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
