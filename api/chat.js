// /api/chat.js
import OpenAI from "openai";

export default async function handler(req, res) {
  // ✅ CORS setup for local + production safety
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { messages, code } = req.body;

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are Focsera AI Assistant — a professional coding mentor inside a web IDE. Be concise, context-aware, and educational.",
        },
        { role: "user", content: `User's current code:\n${code}` },
        ...messages,
      ],
    });

    return res.status(200).json({
      reply: completion.choices[0].message.content,
    });
  } catch (err) {
    console.error("Chat API error:", err);
    return res.status(500).json({ error: "AI request failed" });
  }
}
