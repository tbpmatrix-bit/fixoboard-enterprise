// server/routes/chat.ts
import { Router, Request, Response } from "express";

const router = Router();

// Static system prompt — same content as the previous Gemini setup,
// scoped to keep the bot answering Fixoboard product/feature questions
// rather than wandering into unrelated topics.
const SYSTEM_PROMPT = `You are Fixoboard's industrial support bot. Fixoboard is a brand by Atlantic Polymers Pvt. Ltd. with over 30 years of history.
Makers of high-quality PVC/WPC Ply, WPC Doors, Prelaminate Ply, WPC Door Frames, and PVC Marble Sheets.
Features: 100% waterproof, termite proof, lead-free, fire resistant, and industrial grade.
Your tone should be professional, helpful, and concise.
Reply in plain text only — no Markdown, no asterisks, no bullet symbols, no numbered lists with special formatting. Use plain sentences or simple numbered lines like "1. Product name" if a list is needed.
If users ask about pricing, guide them to the quote page.
Our office is in Kandivali (W), Mumbai.
Contact: +91 9930349472, info@fixoboard.com.`;

// POST /api/chat — single-turn chatbot, no conversation memory.
// Each request is independent: system prompt + the user's latest message only.
router.post("/chat", async (req: Request, res: Response) => {
  const { message } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "A message is required." });
  }

  try {
    const groqRes = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: message },
          ],
          temperature: 0.5,
          max_tokens: 500,
        }),
      },
    );

    const data = (await groqRes.json()) as {
      choices?: { message?: { content?: string } }[];
      error?: { message?: string };
    };

    if (!groqRes.ok) {
      console.error("Groq API error:", data);
      throw new Error(data.error?.message || "Groq request failed.");
    }

    const reply = data.choices?.[0]?.message?.content;

    if (!reply) {
      throw new Error("No response content from Groq.");
    }

    res.status(200).json({ reply });
  } catch (err) {
    console.error("Error in /api/chat:", err);
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
});

export default router;
