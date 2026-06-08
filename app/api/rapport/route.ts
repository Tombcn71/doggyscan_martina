import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { neon } from "@neondatabase/serverless";
import { auth } from "@clerk/nextjs/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function GET(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const dogName = searchParams.get("name") || "mi perro";
    const dogId = searchParams.get("dogId");

    const sql = neon(process.env.DATABASE_URL!);

    const dossierItems = dogId
      ? await sql`
          SELECT tool_id, summary, image_url, created_at
          FROM scans
          WHERE user_id = ${userId} AND dog_id = ${dogId} AND is_ok = false
          ORDER BY created_at DESC
          LIMIT 20
        `
      : await sql`
          SELECT tool_id, summary, image_url, created_at
          FROM scans
          WHERE user_id = ${userId} AND is_ok = false
          ORDER BY created_at DESC
          LIMIT 20
        `;

    if (!dossierItems || dossierItems.length === 0) {
      return NextResponse.json({
        brief: `Actualmente no tengo observaciones especiales registradas para ${dogName}.`,
        details: [],
      });
    }

    const observaciones = dossierItems
      .map((item) => `- [Área: ${item.tool_id}]: ${item.summary}`)
      .join("\n");

    const result = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Ayudas a un dueño de perro a preparar una breve lista de notas para el veterinario.
                     El objetivo es mencionar TODOS los problemas observados que figuran a continuación en un relato natural y fluido.
                     Responde SIEMPRE en español.

                     Aquí están las observaciones de ${dogName}:
                     ${observaciones}

                     INSTRUCCIONES ESTRICTAS:
                     - NO uses títulos como "Informe de observación" o "PetCheck".
                     - NO uses encabezados clínicos como "Piel:" u "Ojos:".
                     - Escribe un relato fluido en primera persona (desde el dueño).
                     - INCLUYE CADA PUNTO de la lista anterior. Si hay 3 puntos, menciónalos todos.
                     - NO uses clichés de IA ni cierres formales.
                     - Traduce todos los términos (Skin -> Piel, Eyes -> Ojos, Dental -> Dentadura, Ears -> Orejas).
                     - Hazlo personal: "Me di cuenta de que Luna... Además vi en ella... también..."

                     Comienza el texto directamente con: "Notas para la visita con ${dogName}"`,
            },
          ],
        },
      ],
    });

    const briefTekst = result.text;
    if (!briefTekst) throw new Error("Respuesta vacía de la IA");

    return NextResponse.json({
      brief: briefTekst,
      details: dossierItems,
    });
  } catch (error: any) {
    console.error("Rapport API Error:", error);
    return NextResponse.json(
      { error: "Error al generar: " + error.message },
      { status: 500 },
    );
  }
}
