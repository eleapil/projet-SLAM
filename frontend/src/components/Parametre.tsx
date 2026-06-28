import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import "./Parametre.css";

async function envoyerSettings(theme: string, clavier: string) {
  try {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    console.log(loggedUser);

    await fetch("http://localhost:3000/api/settings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        users_id: loggedUser.id,
        theme: theme,
        clavier: clavier,
      }),
    });
  } catch (error) {
    console.error(error);
  }
}

//modal pour faire un pop up de paramètres
export default function Parametre({
  open,
  setOpen,
  setLangueClavier,
  setTheme,
  langueClavier,
  theme,
}: any) {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-10"
    >
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75 backdrop-blur-sm" />

      <div className="">
        <DialogPanel className="pannel w-[500px] h-[500px]">
          <DialogTitle className="titre">Clavier :</DialogTitle>
          <br />
          <button
            onClick={() => {
              setOpen(false);
              setLangueClavier("azerty");
              envoyerSettings(theme, "azerty");
            }}
            className={`boutonAzerty ${langueClavier === "azerty" ? "actif" : ""}`}
          >
            AZERTY
          </button>
          <button
            onClick={() => {
              setOpen(false);
              setLangueClavier("qwerty");
              envoyerSettings(theme, "qwerty");
            }}
            className={`boutonQwerty ${langueClavier === "qwerty" ? "actif" : ""}`}
          >
            QWERTY
          </button>
          <DialogTitle className="titre">Thèmes :</DialogTitle>
          <button
            onClick={() => {
              setOpen(false);
              setTheme("light");
              envoyerSettings("light", langueClavier);
            }}
            className={`boutonLight ${theme === "light" ? "actif" : ""}`}
          >
            ☼ CLAIR
          </button>
          <button
            onClick={() => {
              setOpen(false);
              setTheme("dark");
              envoyerSettings("dark", langueClavier);
            }}
            className={`boutonDark ${theme === "dark" ? "actif" : ""}`}
          >
            ☾ SOMBRE
          </button>
          <br />
          <button onClick={() => setOpen(false)} className="boutonFermer">
            X Fermer
          </button>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
