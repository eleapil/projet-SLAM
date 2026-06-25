import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import Profil from "./Profil";

export default function PopUpProfil({ open, setOpen }: any) {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-50"
    >
      <DialogBackdrop className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm" /> {/* flou arrière plan */}

      <div className="fixed inset-0 z-10 overflow-y-auto flex min-h-full items-center justify-center p-4">
        
        <DialogPanel className="w-full max-w-4xl bg-gray-900 rounded-2xl p-6 shadow-2xl border border-gray-800">
          
          <Profil />

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