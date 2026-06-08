"use client";

import { useState, useRef } from "react";
import {
  Camera,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    size: "mediano",
    breed: "",
    age: "",
    weight: "",
    gender: "",
    sterilized: "",
  });

  const nextStep = () => setStep((prev) => prev + 1);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setFormData({ ...formData, image: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleFinish = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/dogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        window.location.href = "/dashboard";
      } else {
        const errorData = await response.json();
        alert("Error al guardar: " + (errorData.error || "Error desconocido"));
      }
    } catch (error) {
      alert("Ha ocurrido un error de red.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-[100dvh] w-full bg-[#F8FAFC] flex flex-col font-sans text-[#1A1A2E] overflow-hidden">
      <div className="w-full max-w-xl mx-auto px-8 pt-20 pb-4 flex-none">
        <div className="flex gap-1.5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full transition-all duration-500 ${
                step >= i ? "bg-[#4FC3F7]" : "bg-slate-200"
              }`}
            />
          ))}
        </div>
        <div className="flex justify-between items-center mt-3">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#4FC3F7]">
            DoggyScan
          </span>
          <span className="text-[10px] font-black uppercase text-slate-400">
            {step}/6
          </span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 min-h-0">
        <div className="w-full max-w-xl">
          {/* PASO 1: NOMBRE */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in zoom-in-95">
              <h1 className="text-4xl font-black uppercase tracking-tighter leading-none">
                ¿Cómo se llama <br />{" "}
                <span className="text-[#4FC3F7]">tu doggy?</span>
              </h1>
              (en tu panel puedes añadir varios perros)
              <input
                autoFocus
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-6 border-4 border-[#1A1A2E] rounded-2xl font-black text-xl uppercase outline-none focus:border-[#4FC3F7] bg-white"
                placeholder="NOMBRE AQUÍ..."
              />
              <Button
                onClick={nextStep}
                disabled={!formData.name}
                className="w-full py-8 bg-[#1A1A2E] text-white font-black uppercase rounded-2xl text-lg shadow-[0_6px_0_0_#4FC3F7]">
                Siguiente <ArrowRight className="ml-2" />
              </Button>
            </div>
          )}

          {/* PASO 2: FOTO */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in">
              <h1 className="text-4xl font-black uppercase tracking-tighter leading-none">
                ¿Tienes una <br />{" "}
                <span className="text-[#4FC3F7]">bonita foto</span>?
              </h1>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileUpload}
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-full aspect-video max-h-[160px] bg-white border-4 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-[#4FC3F7] overflow-hidden">
                {formData.image ? (
                  <img
                    src={formData.image}
                    className="w-full h-full object-cover"
                    alt="Preview"
                  />
                ) : (
                  <>
                    <Camera size={32} className="text-slate-200 mb-2" />
                    <span className="text-slate-400 font-black uppercase text-[10px]">
                      Haz clic para subir
                    </span>
                  </>
                )}
              </div>
              <Button
                onClick={nextStep}
                className="w-full py-6 bg-[#1A1A2E] text-white font-black uppercase rounded-2xl shadow-[0_6px_0_0_#4FC3F7]">
                Guardar & Continuar
              </Button>
            </div>
          )}

          {/* PASO 3: TAMAÑO & TIPO */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in">
              <h1 className="text-4xl font-black uppercase tracking-tighter leading-none">
                ¿Qué tipo de <span className="text-[#4FC3F7]">doggy</span> es?
              </h1>
              <input
                value={formData.breed}
                placeholder="RAZA (EJ. LABRADOR)"
                className="w-full p-4 border-4 border-[#1A1A2E] rounded-xl font-black uppercase outline-none focus:border-[#4FC3F7]"
                onChange={(e) =>
                  setFormData({ ...formData, breed: e.target.value })
                }
              />
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: "pequeño", label: "pequeño" },
                  { value: "mediano", label: "mediano" },
                  { value: "grande", label: "grande" },
                ].map((s) => (
                  <button
                    key={s.value}
                    onClick={() => setFormData({ ...formData, size: s.value })}
                    className={`py-4 border-4 rounded-xl font-black uppercase text-xs ${formData.size === s.value ? "border-[#4FC3F7] bg-blue-50" : "border-[#1A1A2E]"}`}>
                    {s.label}
                  </button>
                ))}
              </div>
              <Button
                onClick={nextStep}
                className="w-full py-6 bg-[#1A1A2E] text-white font-black uppercase rounded-2xl shadow-[0_6px_0_0_#4FC3F7]">
                Siguiente
              </Button>
            </div>
          )}

          {/* PASO 4: EDAD & PESO */}
          {step === 4 && (
            <div className="space-y-6 animate-in fade-in">
              <h1 className="text-4xl font-black uppercase tracking-tighter leading-none text-[#4FC3F7]">
                Stats de {formData.name}
              </h1>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400">
                    Edad (años)
                  </label>
                  <input
                    type="number"
                    value={formData.age}
                    placeholder="0"
                    className="w-full p-5 border-4 border-[#1A1A2E] rounded-xl font-black uppercase outline-none focus:border-[#4FC3F7]"
                    onChange={(e) =>
                      setFormData({ ...formData, age: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400">
                    Peso (kg)
                  </label>
                  <input
                    type="number"
                    value={formData.weight}
                    placeholder="0"
                    className="w-full p-5 border-4 border-[#1A1A2E] rounded-xl font-black uppercase outline-none focus:border-[#4FC3F7]"
                    onChange={(e) =>
                      setFormData({ ...formData, weight: e.target.value })
                    }
                  />
                </div>
              </div>
              <Button
                onClick={nextStep}
                disabled={!formData.age || !formData.weight}
                className="w-full py-8 bg-[#1A1A2E] text-white font-black uppercase rounded-2xl shadow-[0_6px_0_0_#4FC3F7]">
                Siguiente
              </Button>
            </div>
          )}

          {/* PASO 5: SEXO & ESTERILIZACIÓN */}
          {step === 5 && (
            <div className="space-y-6 animate-in fade-in">
              <h1 className="text-4xl font-black uppercase tracking-tighter leading-none text-[#4FC3F7]">
                Salud
              </h1>
              <div className="space-y-4">
                <div className="flex gap-2">
                  {[
                    { value: "Macho", label: "Macho" },
                    { value: "Hembra", label: "Hembra" },
                  ].map((g) => (
                    <button
                      key={g.value}
                      onClick={() => setFormData({ ...formData, gender: g.value })}
                      className={`flex-1 py-5 border-4 rounded-xl font-black uppercase ${formData.gender === g.value ? "border-[#4FC3F7] bg-blue-50" : "border-[#1A1A2E]"}`}>
                      {g.label}
                    </button>
                  ))}
                </div>
                <div className="p-4 bg-white border-4 border-[#1A1A2E] rounded-2xl">
                  <p className="text-[10px] font-black uppercase text-slate-400 mb-3 text-center">
                    ¿Está {formData.name} castrado/a?
                  </p>
                  <div className="flex gap-2">
                    {[
                      { value: "Sí", label: "Sí" },
                      { value: "No", label: "No" },
                    ].map((s) => (
                      <button
                        key={s.value}
                        onClick={() =>
                          setFormData({ ...formData, sterilized: s.value })
                        }
                        className={`flex-1 py-3 rounded-lg font-black uppercase text-xs ${formData.sterilized === s.value ? "bg-[#4FC3F7] text-white" : "bg-slate-100 text-slate-400"}`}>
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <Button
                onClick={nextStep}
                disabled={!formData.gender || !formData.sterilized}
                className="w-full py-8 bg-[#1A1A2E] text-white font-black uppercase rounded-2xl shadow-[0_6px_0_0_#4FC3F7]">
                Ver resultado
              </Button>
            </div>
          )}

          {/* PASO 6: ACTIVACIÓN */}
          {step === 6 && (
            <div className="animate-in zoom-in-95 border-4 border-[#1A1A2E] p-6 rounded-3xl bg-white shadow-[12px_12px_0_0_#4FC3F7] space-y-4">
              <div className="text-center">
                <ShieldCheck
                  className="mx-auto text-[#4FC3F7] mb-2"
                  size={40}
                />
                <h2 className="text-2xl font-black uppercase tracking-tighter leading-tight">
                  Activar prueba <br /> para {formData.name}
                </h2>
              </div>
              <div className="bg-[#F8FAFC] p-4 rounded-xl border-2 border-slate-100 flex justify-between items-center">
                <span className="text-[10px] font-black uppercase text-slate-400">
                  Total hoy
                </span>
                <span className="text-xl font-black text-emerald-500">
                  €0,00
                </span>
              </div>
              <Button
                onClick={handleFinish}
                disabled={isSubmitting}
                className="w-full py-7 bg-[#4FC3F7] hover:bg-[#1A1A2E] text-white font-black uppercase rounded-2xl text-lg shadow-[0_6px_0_0_#1A1A2E]">
                {isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Comenzar gratis ahora"
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
