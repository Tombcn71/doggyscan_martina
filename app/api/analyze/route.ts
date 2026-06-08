import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { put } from "@vercel/blob";
import { neon } from "@neondatabase/serverless";
import { auth } from "@clerk/nextjs/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const TRIAL_DAYS = 7;

const SYSTEM_PROMPTS: Record<string, string> = {
  pain: "Señales de dolor: Analiza la expresión facial. Presta atención a los ojos, orejas y hocico.",
  vomit: "Análisis de vómito: Analiza el color y el contenido.",
  poop: "Heces: evalúa la consistencia y el color.",
  eyes: "Ojos: comprueba opacidad o enrojecimiento.",
  ears: "Orejas: comprueba enrojecimiento y secreciones.",
  nose: "Nariz: comprueba costras o secreciones.",
  skin: "Piel: busca zonas sin pelo y enrojecimiento.",
  ticks: "Parásitos: busca pulgas y garrapatas.",
  mange: "Sarna: busca pérdida de pelo o costras.",
  dental: "Dentadura: busca sarro o inflamaciones.",
  symmetry: "Simetría: analiza la postura y distribución del peso.",
  coat: "Pelaje: evalúa el brillo y la calidad.",
};

export async function POST(req: Request) {
  try {
    const { userId, sessionClaims } = await auth();
    if (!userId)
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });

    const metadata = sessionClaims?.metadata as
      | { role?: string; trialEndsAt?: string }
      | undefined;
    const isPro = metadata?.role === "pro";
    const trialEndsAt = metadata?.trialEndsAt;
    const isTrialValid =
      trialEndsAt && new Date(trialEndsAt).getTime() > Date.now();

    if (!isPro && !isTrialValid) {
      return NextResponse.json({ error: "Acceso denegado" }, { status: 403 });
    }

    const { image, toolId, dogId } = await req.json();
    if (!image)
      return NextResponse.json({ error: "No hay imagen" }, { status: 400 });

    const base64Data = image.split(",")[1];
    const buffer = Buffer.from(base64Data, "base64");
    const instruction =
      SYSTEM_PROMPTS[toolId] || "Realiza una revisión veterinaria general.";

    const blob = await put(`scans/${userId}/${Date.now()}.jpg`, buffer, {
      access: "public",
      contentType: "image/jpeg",
    });

    const result = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Experto veterinario. Tarea: ${instruction}. Responde SIEMPRE en español. JSON ESTRICTO: {"summary": "string", "isOk": boolean, "details": "string", "advice": "string"}`,
            },
            { inlineData: { mimeType: "image/jpeg", data: base64Data } },
          ],
        },
      ],
      config: { responseMimeType: "application/json" },
    });

    const aiData = JSON.parse(
      result
        .text!.replace(/```json/g, "")
        .replace(/```/g, "")
        .trim(),
    );

    const sql = neon(process.env.DATABASE_URL!);
    await sql`
      INSERT INTO scans (user_id, dog_id, tool_id, image_url, summary, is_ok, details, advice)
      VALUES (${userId}, ${dogId}, ${toolId}, ${blob.url}, ${aiData.summary}, ${aiData.isOk}, ${aiData.details}, ${aiData.advice})
    `;

    return NextResponse.json(aiData);
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Error al procesar" }, { status: 500 });
  }
}
