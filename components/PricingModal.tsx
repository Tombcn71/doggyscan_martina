"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { X, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  dogId?: string;
}

export function PricingModal({ isOpen, onClose, dogId }: PricingModalProps) {
  const [portalTarget, setPortalTarget] = useState<Element | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && document.body) {
      setPortalTarget(document.body);
    }
  }, []);

  if (!isOpen || !portalTarget) return null;

  return createPortal(
    <div className="fixed inset-0 bg-white/85 backdrop-blur-xl flex items-center justify-center z-[999999] p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 w-[95vw] max-w-md max-h-[90vh] overflow-y-auto relative shadow-[0_25px_60px_-15px_rgba(0,0,0,0.1)] border-4 border-[#4FC3F7] transform animate-in zoom-in-95 duration-200">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#4FC3F7]/10 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 p-1.5 rounded-full transition-colors z-10"
          type="button">
          <X size={20} strokeWidth={3} />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 overflow-hidden bg-slate-50 p-2 shadow-sm">
            <Image
              src="/icons/icon-192x192 (1).png"
              alt="Logo"
              width={64}
              height={64}
              className="object-contain"
            />
          </div>
          <span className="text-[10px] bg-blue-50 text-[#4FC3F7] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-blue-100">
            Elige la mejor atención
          </span>
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter italic text-[#1A1A2E] mt-3">
            Desbloquea Pro
          </h2>

          <p className="text-xs text-slate-500 mt-2 font-bold max-w-sm mx-auto leading-relaxed">
            🚀 ¡Sé uno de nuestros{" "}
            <span className="text-[#4FC3F7]">Early Adopters</span>! Ayúdanos a
            construir DoggyScan y reclama un descuento de por vida como
            agradecimiento por tu confianza temprana.
          </p>
        </div>

        {/* USPs */}
        <div className="bg-slate-50 rounded-2xl p-4 mb-6 border border-slate-100 space-y-2.5">
          {[
            "Acceso para 3 perros",
            "Escaneos de salud IA ilimitados",
            "Expediente médico histórico",
            "Informe PDF para el veterinario",
            "Resultado directo en 30 segundos",
          ].map((text, i) => (
            <div key={i} className="flex items-start gap-2.5 text-left">
              <CheckCircle2
                size={16}
                className="text-[#4FC3F7] shrink-0 mt-0.5"
              />
              <span className="text-xs font-bold text-slate-700">{text}</span>
            </div>
          ))}
        </div>

        {/* Planes */}
        <div className="space-y-3.5">
          <button
            onClick={() =>
              (window.location.href =
                "/api/stripe/checkout?priceId=price_1TRDtmRK5rzSG2g74m7KLTE0")
            }
            className="w-full group bg-white border-2 border-slate-200 p-4 rounded-2xl hover:border-[#4FC3F7] hover:bg-slate-50/50 transition-all text-left flex items-center justify-between outline-none">
            <div>
              <span className="font-black uppercase tracking-tight text-xs text-slate-400 block mb-0.5">
                Suscripción flexible
              </span>
              <span className="font-extrabold uppercase tracking-tighter text-base text-[#1A1A2E]">
                Mensual
              </span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-[#1A1A2E]">€10,00</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase block -mt-1">
                / mes
              </span>
            </div>
          </button>

          <button
            onClick={() =>
              (window.location.href =
                "/api/stripe/checkout?priceId=price_1TRDtmRK5rzSG2g7mqIpKZcW")
            }
            className="w-full group bg-sky-50 border-2 border-[#4FC3F7] p-4 rounded-2xl hover:scale-[1.01] transition-all text-left relative overflow-hidden outline-none">
            <span className="absolute top-0 right-0 bg-[#4FC3F7] text-[#1A1A2E] text-[9px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-tighter shadow-sm flex items-center gap-1">
              <Sparkles size={10} /> Early Bird -50%
            </span>
            <div className="flex items-center justify-between">
              <div>
                <span className="font-black uppercase tracking-tight text-xs text-[#4FC3F7] block mb-0.5">
                  Mejor Oferta
                </span>
                <span className="font-extrabold uppercase tracking-tighter text-base text-[#1A1A2E]">
                  Plan anual
                </span>
              </div>
              <div className="text-right pr-16">
                <span className="text-2xl font-black text-[#1A1A2E]">
                  €60,00
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase block -mt-1">
                  / año
                </span>
              </div>
            </div>
          </button>
        </div>

        {/* Privacidad */}
        <div className="mt-6 pt-5 border-t border-slate-100 text-center">
          <div className="flex items-center justify-center gap-1.5 text-slate-400 mb-1">
            <ShieldCheck size={13} className="text-slate-400" />
            <span className="text-[10px] font-bold uppercase tracking-wider">
              Privacidad & Control
            </span>
          </div>
          <p className="text-[11px] text-slate-400 font-semibold leading-relaxed px-2">
            ¿No necesitas Pro? No estás comprometido a nada. Puedes destruir
            permanentemente tu cuenta y todos los datos médicos almacenados en
            cualquier momento desde los{" "}
            <Link
              href={`/dashboard/instellingen${dogId ? `?dogId=${dogId}` : ""}`}
              onClick={onClose}
              className="text-[#4FC3F7] font-bold underline hover:text-[#1A1A2E] transition-colors">
              Ajustes
            </Link>
            .
          </p>
        </div>
      </div>
    </div>,
    portalTarget,
  );
}
