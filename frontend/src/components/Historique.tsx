import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import StatsScorePerso from "./ScorePerso";
import "./Historique.css";

export default function Historique({ open, setOpen }: any) {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-50"
    >
      {/* arriere plan*/}
      <DialogBackdrop className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm" />

      <div className="fixed inset-0 z-10 overflow-y-auto flex min-h-full items-center justify-center p-4">
        <DialogPanel className="hist-panel w-full max-w-4xl rounded-2xl p-6 shadow-2xl">
          <StatsScorePerso />

          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setOpen(false)}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors shadow-md"
            >
              X Fermer
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
