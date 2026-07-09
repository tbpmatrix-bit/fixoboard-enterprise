// server/routes/chat.ts
import pool from "../db/client";
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

// GET /api/chat/history/:roomId — used by ChatWidget on load to check if a
// live-chat conversation exists and should resume (or show as ended).
router.get("/chat/history/:roomId", async (req: Request, res: Response) => {
  const { roomId } = req.params;

  const room = await pool.query(
    `SELECT room_id, customer_name, status FROM chat_rooms WHERE room_id = $1`,
    [roomId],
  );

  if (room.rows.length === 0) {
    return res.status(404).json({ error: "Room not found." });
  }

  const messages = await pool.query(
    `SELECT id, sender, message, created_at FROM chat_messages
     WHERE room_id = $1 ORDER BY created_at ASC`,
    [roomId],
  );

  res.json({
    roomId: room.rows[0].room_id,
    customerName: room.rows[0].customer_name,
    status: room.rows[0].status,
    messages: messages.rows,
  });
});

// GET /api/chat/rooms — list all rooms for the admin dashboard,
// most recently active first, each with a preview of its last message.
router.get("/chat/rooms", async (req: Request, res: Response) => {
  const rooms = await pool.query(
    `SELECT
       r.room_id,
       r.customer_name,
       r.status,
       r.last_message_at,
       m.message AS last_message,
       m.sender AS last_message_sender
     FROM chat_rooms r
     LEFT JOIN LATERAL (
       SELECT message, sender
       FROM chat_messages
       WHERE room_id = r.room_id
       ORDER BY created_at DESC
       LIMIT 1
     ) m ON true
     ORDER BY r.last_message_at DESC`,
  );

  res.json({ rooms: rooms.rows });
});

export default router;
