import OpenAI from "openai";
import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/chat", async (req, res) => {
  const { messages, code } = req.body;

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are Focsera AI Assistant — a coding mentor." },
        { role: "user", content: `User's current code:\n${code}` },
        ...messages,
      ],
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (err) {
    console.error("Chat API error:", err);
    res.status(500).json({ error: "AI request failed" });
  }
});

app.listen(3000, () => console.log("✅ AI API running on port 3000"));
