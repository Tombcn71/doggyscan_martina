"use client";

import Link from "next/link";
import { Show, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PawPrint, ArrowRight, Sparkles } from "lucide-react";
import Pricing from "@/components/Pricing";
import Faq from "@/components/Faq";

const features = [
  {
    icon: "🤕",
    title: "Señales de Dolor",
    desc: "Análisis de IA de la expresión facial para dolor agudo.",
  },
  {
    icon: "🤮",
    title: "Análisis de Vómito",
    desc: "Analiza el color y contenido del vómito.",
  },

  {
    icon: "💩",
    title: "Análisis de Heces",
    desc: "Comprueba sangre, consistencia y signos de lombrices.",
  },
  {
    icon: "👁️",
    title: "Revisión Ocular",
    desc: "Comprueba cataratas, ojos rojos e inflamaciones.",
  },
  {
    icon: "🐶",
    title: "Salud de Oídos",
    desc: "Detecta ácaros del oído e inflamaciones profundas.",
  },
  {
    icon: "🐽",
    title: "Revisión Nasal",
    desc: "Comprueba costras, sequedad extrema o mucosidad.",
  },
  {
    icon: "🐾",
    title: "Piel & Alergia",
    desc: "Reconoce hongos, hotspots y erupciones alérgicas.",
  },
  {
    icon: "🪰",
    title: "Parásitos & Garrapatas",
    desc: "Encuentra pulgas, ácaros o piojos e identifica el riesgo de garrapatas.",
  },
  {
    icon: "🔬",
    title: "Tiña & Sarna",
    desc: "Distingue directamente entre diferentes parásitos.",
  },
  {
    icon: "🦷",
    title: "Dentadura & Encías",
    desc: "Monitorea el sarro y la inflamación de encías (gingivitis).",
  },

  {
    icon: "⚖️",
    title: "Simetría Postural",
    desc: "Comprueba si tu perro está recto y distribuye bien su peso.",
  },

  {
    icon: "🐕",
    title: "Pelaje & Brillo",
    desc: "Evalúa el pelaje opaco y posibles deficiencias nutricionales.",
  },
];

export default function Home() {
  return (
    <div className="bg-white text-[#1A1A2E] font-sans overflow-x-hidden">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Syne:wght@800&family=DM+Sans:wght@400;500;700&display=swap");
      `}</style>

      {/* HERO SECTION */}
      <main className="relative max-w-[1200px] mx-auto px-6 py-24 md:py-32 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#4FC3F7]/10 via-transparent to-transparent -z-10" />

        <Badge
          variant="secondary"
          className="bg-[#E6F1FB] text-[#0288D1] border-none px-4 py-1.5 mb-8 rounded-full font-bold tracking-wide">
          <Sparkles className="w-3.5 h-3.5 mr-2" />
          Next-Gen Veterinary AI
        </Badge>

        <h1 className="text-4xl md:text-7xl font-black   mb-8">
          Escáner de Salud IA, <br />
          <span className="text-[#4FC3F7] ">para tu doggy.</span>
        </h1>

        <p className="text-lg md:text-xl text-[#6B6B8A] max-w-[700px] mx-auto mb-12 leading-relaxed font-medium">
          Análisis avanzado de síntomas y creación automática de expedientes.
          Asistencia inteligente para cada dueño de perro, disponible 24/7.{" "}
        </p>

        <div className="flex justify-center items-center gap-4">
          <Show when="signed-out">
            <Link href="/signup?redirect_url=/onboarding">
              {" "}
              <Button
                size="lg"
                className="bg-[#1A1A2E] hover:bg-black text-white px-10 h-16 rounded-2xl font-bold text-lg transition-all hover:scale-105 shadow-xl shadow-[#1A1A2E]/20">
                Comenzar Semana Gratis <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </Show>

          <Show when="signed-in">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-[#1A1A2E] hover:bg-black text-white px-10 h-16 rounded-2xl font-bold text-lg transition-all hover:scale-105 shadow-xl shadow-[#1A1A2E]/20">
                Ir a mi Panel <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </Show>
        </div>
      </main>

      {/* FEATURE SECTION */}
      <section className="bg-[#F9FAFB] py-24 px-6 border-y border-slate-100">
        <section id="features" className="scroll-mt-20">
          {/* ... */}
        </section>
        <div className="max-w-[1200px] mx-auto">
          <header className="text-center mb-20">
            <h2
              className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4 text-[#1A1A2E]"
              style={{ fontFamily: "'Syne', sans-serif" }}>
              Capacidades de <span className="text-[#4FC3F7]">Escaneo</span>
            </h2>
            <div className="h-1.5 w-20 bg-[#4FC3F7] mx-auto rounded-full" />
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <Card
                key={i}
                className="bg-white border-slate-200/60 rounded-[32px] overflow-hidden hover:border-[#4FC3F7] hover:shadow-2xl hover:shadow-[#4FC3F7]/10 transition-all duration-500 group cursor-default">
                <CardHeader className="pb-2 p-8">
                  <div className="text-4xl mb-6 group-hover:scale-125 transition-transform duration-500 origin-left inline-block">
                    {f.icon}
                  </div>
                  <CardTitle
                    className="text-lg font-black uppercase italic tracking-tight"
                    style={{ fontFamily: "'Syne', sans-serif" }}>
                    {f.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <p className="text-[#6B6B8A] text-sm leading-relaxed font-medium">
                    {f.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Pricing />
      <Faq />

      {/* FOOTER */}
      <footer className="py-20 px-6 text-center border-t border-slate-100 bg-white">
        <div className="flex flex-col items-center justify-center gap-6">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-[#4FC3F7] text-white w-9 h-9 flex items-center justify-center rounded-xl shadow-sm">
              <PawPrint fill="currentColor" size={20} />
            </div>
            <span className="font-heading font-extrabold text-[#1A1A2E] tracking-tighter text-lg uppercase">
              Doggy<span className="text-[#4FC3F7]">scan.nl</span>
            </span>
          </Link>

          <div className="max-w-md mx-auto">
            <p className="text-[#AAAAAA] text-xs font-bold uppercase tracking-[0.2em] leading-relaxed">
              © 2026 Doggyscan.nl <br />
              <span className="opacity-50 text-[10px]">
                Solo con fines informativos. No reemplaza el consejo
                veterinario profesional.
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
