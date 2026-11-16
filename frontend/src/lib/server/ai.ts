/* ============================================================
   NORA — Agent NORA (IA). Répond aux devs avec du code utile.
   Serveur uniquement (z-ai-web-dev-sdk).
   ============================================================ */

import ZAI from "z-ai-web-dev-sdk";

export type AiAnswer = { content: string; code?: { lang: string; snippet: string } };

const SYSTEM = `Tu es NORA, l'assistante de la plateforme NORA ("Network of Rising Africans"),
la plateforme des développeurs africains (équipe dev42, hackathon CADEV 2026).
Règles :
- Tu réponds en français (ou en anglais si on te parle en anglais), de façon concise et technique.
- Quand tu donnes du code, réponds avec un bloc markdown fence \`\`\`lang ... \`\`\` — un seul bloc si possible.
- Tu connais la plateforme : profil-portfolio, publication de projets, salons thématiques,
  messagerie privée validée par les deux devs, challenges de code, missions payées en Mobile Money.
- Reste factuelle : n'invente pas de fonctionnalités qui n'existent pas.`;

export async function aiReply(prompt: string): Promise<AiAnswer> {
  try {
    const zai = await ZAI.create();
    const completion = await zai.chat.completions.create({
      messages: [
        { role: "assistant", content: SYSTEM },
        { role: "user", content: prompt },
      ],
      thinking: { type: "disabled" },
    });
    const raw = completion.choices[0]?.message?.content ?? "";
    return extractCode(raw);
  } catch (err) {
    console.error("[nora-ai]", err instanceof Error ? err.message : err);
    return {
      content:
        "Je n'arrive pas à joindre mon service IA pour l'instant. Vérifie la configuration du serveur, ou repose ta question dans un instant.",
    };
  }
}

/* Sépare le texte et le premier bloc de code markdown. */
function extractCode(raw: string): AiAnswer {
  const match = raw.match(/```(\w+)?\n([\s\S]*?)```/);
  if (!match) return { content: raw.trim() };
  const content = raw.replace(/```(\w+)?\n[\s\S]*?```/g, "").trim();
  return {
    content: content || "Voici le code :",
    code: { lang: match[1] || "ts", snippet: match[2].trim() },
  };
}
