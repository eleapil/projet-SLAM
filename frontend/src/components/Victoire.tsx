import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import "./Victoire.css";

type VictoireProps = {
  open: boolean;
  setOpen: any;
  mot: string;
  rejouer: () => void;
};

//modal pour faire un pop up lorsqu'on gagne
export default function Victoire({
  open,
  setOpen,
  mot,
  rejouer,
}: VictoireProps) {
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />

      <div className="">
        <DialogPanel className="pannel2 w-[500px] h-[260px]">
          <DialogTitle className="titre2">Bravo !</DialogTitle>
          <p className="texte2">Tu as gagné </p>
          <p className="solution2"> Le mot était : {mot} </p>
          <br />
          <button className="bouton2rejouer" onClick={rejouer}>
            ⟲ Rejouer
          </button>
          <button onClick={() => setOpen(false)} className="bouton2fermer">
            X Fermer
          </button>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
