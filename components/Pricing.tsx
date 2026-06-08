"use client";

import { CheckCircle2, Sparkles, Gift, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";

export default function Pricing() {
  const { user, isLoaded } = useUser();

  const isPro = user?.publicMetadata?.role === "pro";
  const trialEndsAt = user?.publicMetadata?.trialEndsAt as string | undefined;
  const trialExpired =
    !isPro &&
    (trialEndsAt ? new Date(trialEndsAt).getTime() < Date.now() : false);

  const features = [
    "Acceso para 3 perros",
    "Escaneos de salud IA ilimitados",
    "Expediente médico histórico",
    "Informe PDF para el veterinario",
    "Resultado directo en 30 segundos",
  ];

  return (
    <section
      id="pricing"
      className="w-full bg-[#F0F9FF] py-20 font-sans scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* HEADER */}
        <header className="text-center mb-16 max-w-2xl mx-auto">
          <h2
            className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4 text-[#01579B]"
            style={{ fontFamily: "'Syne', sans-serif" }}>
            {trialExpired ? (
              <>
                ELIGE TU <span className="text-[#4FC3F7]">PLAN</span>
              </>
            ) : (
              <>
                COMIENZA TU <span className="text-[#4FC3F7]">SEMANA GRATIS</span>
              </>
            )}
          </h2>
          <p className="text-slate-500 font-bold text-lg leading-relaxed">
            {trialExpired
              ? "Tu período de prueba ha terminado. Activa tu cuenta para volver a hacer escaneos."
              : "Descubre lo que la IA puede hacer por la salud de tu perro."}
            <span className="block text-[#0288D1] font-black text-sm mt-2 uppercase tracking-[0.2em]">
              {trialExpired
                ? "Cancelable mensualmente • Activo inmediatamente"
                : "No se necesitan datos de pago para comenzar"}
            </span>
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* TARJETA MENSUAL */}
          <div className="bg-white rounded-[2.5rem] border-4 border-[#4FC3F7]/30 p-8 flex flex-col relative text-center shadow-lg transition-transform hover:scale-[1.02]">
            <span className="text-slate-400 text-[11px] font-black uppercase tracking-[0.2em] mb-6">
              Cancelable mensualmente
            </span>
            <div className="flex items-baseline justify-center gap-1 mb-2">
              <span className="text-7xl font-black text-[#01579B]">€10</span>
              <span className="text-[#4FC3F7] font-bold text-xl">/mes</span>
            </div>
            <p className="text-[#0288D1] font-bold text-sm uppercase mb-8">
              Flexible & Sin compromiso
            </p>

            <ul className="space-y-4 mb-10 flex-grow text-left">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-4 text-sm font-bold text-slate-600 leading-tight">
                  <CheckCircle2
                    size={18}
                    className="text-[#4FC3F7] shrink-0"
                    strokeWidth={3}
                  />
                  {feature}
                </li>
              ))}
            </ul>

            <Button
              asChild
              className="w-full h-16 rounded-2xl bg-white border-4 border-[#01579B] text-[#01579B] font-black uppercase text-sm tracking-widest hover:bg-[#F0F9FF] transition-all">
              <Link
                href={
                  trialExpired
                    ? "/api/stripe?priceId=JOUW_MAAND_PRICE_ID"
                    : "/signup?interval=month&dogs=3"
                }>
                {trialExpired ? "Activar Mensual" : "Elegir Mensual"}
              </Link>
            </Button>
          </div>

          {/* TARJETA ANUAL (LA OFERTA) */}
          <div className="bg-white rounded-[2.5rem] border-4 border-[#4FC3F7] p-8 flex flex-col relative text-center shadow-[16px_16px_0px_0px_rgba(79,195,247,0.4)] transition-transform hover:scale-[1.02]">
            {/* BADGE 6 MESES GRATIS */}
            <div className="absolute -top-6 left-0 right-0 flex justify-center z-30">
              <div className="bg-[#01579B] text-white text-[12px] font-black px-6 py-3 rounded-full uppercase tracking-widest shadow-xl flex items-center gap-2 border-2 border-white">
                <Gift size={16} className="text-[#4FC3F7]" />6 MESES GRATIS
              </div>
            </div>

            <span className="text-[#4FC3F7] text-[11px] font-black uppercase tracking-[0.2em] mb-6">
              Plan Anual de Manada
            </span>

            <div className="flex items-baseline justify-center gap-1 mb-2">
              <span className="text-8xl font-black text-[#01579B]">€5</span>
              <span className="text-[#4FC3F7] font-black text-2xl">/mes</span>
            </div>

            <div className="mb-8 p-3 bg-[#F0F9FF] rounded-2xl border-2 border-dashed border-[#4FC3F7]/30">
              <p className="text-[#01579B] font-black text-lg uppercase">
                €60 AL AÑO
              </p>
              <p className="text-slate-400 text-xs font-bold line-through">
                NORMAL €120
              </p>
            </div>

            <ul className="space-y-4 mb-10 flex-grow text-left">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-4 text-sm font-bold text-slate-700 leading-tight">
                  <CheckCircle2
                    size={18}
                    className="text-[#4FC3F7] shrink-0"
                    strokeWidth={3}
                  />
                  {feature}
                </li>
              ))}
              <li className="flex items-start gap-4 text-sm font-black text-[#0288D1] leading-tight italic">
                <Zap
                  size={18}
                  className="text-[#4FC3F7] shrink-0"
                  fill="currentColor"
                />
                ¡Ahorra 50% al año!
              </li>
            </ul>

            <Button
              asChild
              className="w-full h-20 rounded-2xl bg-[#01579B] hover:bg-[#4FC3F7] text-white font-black uppercase text-lg tracking-widest transition-all shadow-lg active:scale-95 border-none">
              <Link
                href={
                  trialExpired
                    ? "/api/stripe?priceId=JOUW_JAAR_PRICE_ID"
                    : "/signup?interval=year&dogs=3"
                }>
                {trialExpired ? "Activar Anual" : "Comenzar Semana Gratis"}
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="flex items-center justify-center gap-2 text-[#4FC3F7] mb-4">
            <Sparkles size={20} fill="currentColor" />
            <span className="text-sm font-black uppercase tracking-[0.3em] text-[#01579B]">
              Garantía de Calidad
            </span>
          </div>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
            {trialExpired
              ? "Acceso inmediato a los 12 escaneos • Siempre cancelable"
              : "7 días de prueba • Siempre cancelable • Sin datos de pago"}
          </p>
        </div>
      </div>
    </section>
  );
}
