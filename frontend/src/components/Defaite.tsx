import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import "./Defaite.css";

//modal pour faire un pop up lorsqu'on perd
export default function Defaite({ open, setOpen, mot, rejouer }) {
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />

      <div className="">
        <DialogPanel className="pannel1 w-[500px] h-[260px]">
          <DialogTitle className="titre1">Dommage !</DialogTitle>
          <p className="texte1">Tu as perdu </p>
          <p className="solution1"> Le mot était : {mot} </p>
          <br />
          <button className="bouton1rejouer" onClick={rejouer}>
            ⟲ Rejouer
          </button>
          <button onClick={() => setOpen(false)} className="bouton1fermer">
            ✖ Fermer
          </button>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
