import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import "./Parametre.css";

//modal pour faire un pop up de paramètres
export default function Parametre({ open, setOpen, setLangueClavier }: any) {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-10"
    >
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />

      <div className="">
        <DialogPanel className="pannel w-[500px] h-[500px]">
          <DialogTitle className="titre">Clavier :</DialogTitle>
          <br />
          <button
            onClick={() => {
              setOpen(false);
              setLangueClavier("azerty");
            }}
            className="boutonAzerty"
          >
            AZERTY
          </button>
          <button
            onClick={() => {
              setOpen(false);
              setLangueClavier("qwerty");
            }}
            className="boutonQwerty"
          >
            QWERTY
          </button>
          <DialogTitle className="titre">Thèmes :</DialogTitle>
          <button
            onClick={() => {
              setOpen(false);
            }}
            className="boutonQwerty"
          >
            CLAIR
          </button>
          <button
            onClick={() => {
              setOpen(false);
            }}
            className="boutonQwerty"
          >
            SOMBRE
          </button>
          <br />
          <button onClick={() => setOpen(false)} className="boutonFermer">
            ✖ Fermer
          </button>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
