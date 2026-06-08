"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "¿Qué 12 condiciones puede reconocer la IA?",
    answer:
      "Nuestra IA está entrenada con miles de imágenes clínicas y reconoce entre otras: infecciones cutáneas, hotspots, garrapatas/pulgas, inflamaciones oculares, signos de cataratas, problemas de oídos y diversas erupciones cutáneas. El plan Básico te da acceso a la base de datos completa.",
  },
  {
    question: "¿Reemplaza esta app una visita al veterinario?",
    answer:
      "No, PetCheck es una herramienta preventiva. Te ayuda a reconocer síntomas a tiempo y te proporciona un informe médico que puedes compartir con tu veterinario. En casos urgentes, siempre contacta directamente con un especialista.",
  },
  {
    question: "¿Qué tan preciso es el escaneo de IA?",
    answer:
      "La precisión supera actualmente el 90% para las afecciones cutáneas más comunes. Para un resultado óptimo, recomendamos hacer fotos con buena luz natural y enfocando el área problemática.",
  },
  {
    question: "¿Puedo cancelar mi suscripción en cualquier momento?",
    answer:
      "Por supuesto. No trabajamos con contratos vinculantes. Puedes cancelar tu plan Básico con un solo clic en cualquier momento desde la configuración de tu perfil. Mantendrás acceso a tu historial hasta el final de tu período de facturación.",
  },
  {
    question: "¿Cómo funciona la opción para varios perros?",
    answer:
      "En el plan Básico pagas una tarifa fija por el primer perro y una tarifa reducida (€5,00) por cada perro adicional. Así la atención profesional sigue siendo accesible para familias con varios perros.",
  },
];

export default function Faq() {
  return (
    <section className="py-24 bg-white border-t border-slate-50">
      <section id="faq" className="scroll-mt-20">
        {/* ... */}
      </section>
      <div className="max-w-3xl mx-auto px-6">
        <header className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-slate-800"
            style={{ fontFamily: "'Syne', sans-serif" }}>
            Preguntas <span className="text-[#4FC3F7]">Frecuentes</span>
          </h2>
          <div className="h-1.5 w-16 bg-[#4FC3F7] mx-auto rounded-full mt-4" />
        </header>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-slate-100 rounded-[2rem] px-6 shadow-sm bg-white transition-all hover:border-[#4FC3F7]/30">
              <AccordionTrigger className="hover:no-underline py-6">
                <span className="text-left font-bold text-slate-700 hover:text-[#4FC3F7] transition-colors pr-4">
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-slate-500 text-sm leading-relaxed border-t border-slate-50 pt-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
