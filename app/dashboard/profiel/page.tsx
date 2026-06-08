"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useUser } from "@clerk/nextjs";
import { Save, ArrowLeft, Camera, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function ProfielContent() {
  const { user } = useUser();
  const searchParams = useSearchParams();
  const dogId = searchParams.get("dogId");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [dogData, setDogData] = useState({
    name: "",
    breed: "",
    age: "",
    size: "",
    weight: "",
    gender: "",
    sterilized: "",
    image_url: "",
  });

  useEffect(() => {
    const fetchDogData = async () => {
      if (!dogId) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/dogs");
        if (!res.ok) throw new Error("No se pudieron obtener los datos");
        const data = await res.json();

        const currentDog = Array.isArray(data)
          ? data.find((d: any) => d.id.toString() === dogId)
          : data;

        if (currentDog) {
          setDogData({
            name: currentDog.name || "",
            breed: currentDog.breed || "",
            age: currentDog.age || "",
            size: currentDog.size || "",
            weight: currentDog.weight || "",
            gender: currentDog.gender || "",
            sterilized: currentDog.sterilized || "",
            image_url: currentDog.image_url || "",
          });
        }
      } catch (error) {
        console.error("Error al obtener:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDogData();
  }, [dogId]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const base64Image = reader.result as string;
      try {
        const res = await fetch("/api/dogs", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...dogData, dogId, image: base64Image }),
        });
        if (res.ok) {
          const result = await res.json();
          setDogData((prev) => ({ ...prev, image_url: result.url }));
        }
      } catch (error) {
        alert("Error al subir");
      } finally {
        setIsUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch("/api/dogs", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...dogData, dogId, image: null }),
      });
      if (res.ok)
        alert("¡Perfil de " + dogData.name + " actualizado correctamente!");
    } catch (error) {
      alert("Algo salió mal.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading)
    return (
      <div className="p-12 flex items-center gap-4 font-black uppercase text-slate-300">
        <Loader2 className="animate-spin" size={20} /> Cargando...
      </div>
    );

  if (!dogId)
    return (
      <div className="p-12 font-black uppercase text-red-400">
        Ningún perro seleccionado. Vuelve al panel.
      </div>
    );

  return (
    <div className="min-h-screen bg-white font-sans text-[#1A1A2E] p-6 md:p-12">
      <div className="w-full max-w-xl text-left ml-0">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest hover:text-[#4FC3F7] mb-8 group">
          <ArrowLeft
            size={14}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Volver al Panel
        </Link>

        <header className="mb-10">
          <h1 className="text-3xl font-black text-[#1A1A2E] uppercase tracking-tight italic">
            Perfil <span className="text-[#4FC3F7] not-italic px-2">/</span>{" "}
            {dogData.name || "Perro"}
          </h1>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">
            Cuenta: {user?.primaryEmailAddress?.emailAddress}
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* FOTO */}
          <div className="flex flex-col gap-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#4FC3F7]">
              Foto del perro
            </label>
            <div
              onClick={() => !isUploading && fileInputRef.current?.click()}
              className="relative h-32 w-32 rounded-3xl overflow-hidden border-4 border-slate-100 shadow-sm cursor-pointer group bg-slate-50">
              {dogData.image_url ? (
                <img
                  src={dogData.image_url}
                  className="w-full h-full object-cover"
                  alt="Perro"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl">
                  🐶
                </div>
              )}
              <div
                className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity ${
                  isUploading
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                }`}>
                {isUploading ? (
                  <Loader2 className="text-white animate-spin" />
                ) : (
                  <Camera className="text-white" />
                )}
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* NOMBRE */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Nombre
              </label>
              <input
                type="text"
                value={dogData.name}
                onChange={(e) =>
                  setDogData({ ...dogData, name: e.target.value })
                }
                className="p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none focus:border-[#4FC3F7]"
                required
              />
            </div>

            {/* RAZA */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Raza
              </label>
              <input
                type="text"
                value={dogData.breed}
                onChange={(e) =>
                  setDogData({ ...dogData, breed: e.target.value })
                }
                className="p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none focus:border-[#4FC3F7]"
              />
            </div>

            {/* EDAD */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Edad
              </label>
              <input
                type="number"
                value={dogData.age}
                onChange={(e) =>
                  setDogData({ ...dogData, age: e.target.value })
                }
                className="p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none focus:border-[#4FC3F7]"
              />
            </div>

            {/* PESO */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Peso (kg)
              </label>
              <input
                type="number"
                value={dogData.weight}
                onChange={(e) =>
                  setDogData({ ...dogData, weight: e.target.value })
                }
                className="p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none focus:border-[#4FC3F7]"
              />
            </div>

            {/* TAMAÑO */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Tamaño
              </label>
              <select
                value={dogData.size}
                onChange={(e) =>
                  setDogData({ ...dogData, size: e.target.value })
                }
                className="p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none appearance-none">
                <option value="pequeño">Pequeño</option>
                <option value="mediano">Mediano</option>
                <option value="grande">Grande</option>
              </select>
            </div>

            {/* SEXO */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Sexo
              </label>
              <div className="flex gap-2">
                {[
                  { value: "Macho", label: "Macho" },
                  { value: "Hembra", label: "Hembra" },
                ].map((g) => (
                  <button
                    key={g.value}
                    type="button"
                    onClick={() => setDogData({ ...dogData, gender: g.value })}
                    className={`flex-1 py-3 rounded-xl font-bold border-2 transition-all ${
                      dogData.gender === g.value
                        ? "border-[#4FC3F7] bg-blue-50 text-[#1A1A2E]"
                        : "border-slate-100 text-slate-400"
                    }`}>
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            {/* ESTERILIZADO */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Castrado / Esterilizado
              </label>
              <div className="flex gap-2">
                {[
                  { value: "Sí", label: "Sí" },
                  { value: "No", label: "No" },
                ].map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => setDogData({ ...dogData, sterilized: s.value })}
                    className={`flex-1 py-3 rounded-xl font-bold border-2 transition-all ${
                      dogData.sterilized === s.value
                        ? "border-[#4FC3F7] bg-blue-50 text-[#1A1A2E]"
                        : "border-slate-100 text-slate-400"
                    }`}>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSaving || isUploading}
            className="w-full py-5 bg-[#1A1A2E] text-white font-black uppercase text-xs tracking-[0.2em] rounded-2xl hover:bg-[#4FC3F7] transition-all shadow-lg flex items-center justify-center gap-2">
            {isSaving ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <Save size={16} />
            )}
            {isSaving ? "Guardando..." : "Guardar Perfil"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ProfielPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <ProfielContent />
    </Suspense>
  );
}
