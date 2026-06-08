"use client";

import { useEffect, useState } from "react";
import { Share, PlusSquare, X } from "lucide-react";

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showIOSPrompt, setShowIOSPrompt] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as any).standalone === true;
    setIsStandalone(standalone);

    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const isIPhone = /iPhone|iPad|iPod/.test(navigator.userAgent);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (isIPhone && !standalone && isSafari) {
      setShowIOSPrompt(true);
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () =>
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") setDeferredPrompt(null);
  };

  if (isStandalone) return null;

  // ANDROID / CHROME
  if (deferredPrompt) {
    return (
      <div className="fixed bottom-6 left-4 right-4 bg-white border-2 border-[#4FC3F7] rounded-2xl shadow-2xl p-4 flex items-center justify-between z-[100] animate-in fade-in slide-in-from-bottom-5">
        <div className="flex-1">
          <p className="text-sm font-bold text-[#1A1A2E]">
            Instalar Doggyscan
          </p>
          <p className="text-[10px] text-gray-500">
            Acceso rápido siempre al control de salud
          </p>
        </div>
        <button
          onClick={handleInstall}
          className="bg-[#4FC3F7] text-white text-xs font-black px-5 py-2.5 rounded-full uppercase tracking-wider shadow-md active:scale-95 transition-transform">
          Instalar
        </button>
      </div>
    );
  }

  // IOS / SAFARI
  if (showIOSPrompt) {
    return (
      <div className="fixed bottom-10 left-4 right-4 bg-white border-2 border-[#4FC3F7] rounded-[2rem] shadow-2xl p-6 z-[100] animate-bounce-subtle">
        <button
          onClick={() => setShowIOSPrompt(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>
        <div className="space-y-3">
          <h4 className="font-black text-[#1A1A2E] text-sm uppercase tracking-tight">
            Instalar en tu iPhone
          </h4>
          <p className="text-xs text-gray-600 leading-relaxed">
            Usa Doggyscan como una app real:
          </p>
          <ol className="text-xs text-gray-700 space-y-2">
            <li className="flex items-center gap-2">
              <span className="bg-gray-100 w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold">
                1
              </span>
              Toca el botón de compartir en la parte inferior{" "}
              <Share size={16} className="text-blue-500" />
            </li>
            <li className="flex items-center gap-2">
              <span className="bg-gray-100 w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold">
                2
              </span>
              Desplázate hacia abajo y toca{" "}
              <span className="font-bold underline">Añadir a la pantalla de inicio</span>{" "}
              <PlusSquare size={16} />
            </li>
          </ol>
        </div>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b-2 border-r-2 border-[#4FC3F7] rotate-45"></div>
      </div>
    );
  }

  return null;
}
