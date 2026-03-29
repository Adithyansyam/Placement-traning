import express from "express";

const router = express.Router();

const SYSTEM_PROMPT = `You are PlacePrep AI, an expert placement and interview preparation assistant.
Help students with:
- Technical interview preparation (DSA, System Design, LLD)
- HR and behavioral interview questions
- Resume tips and feedback
- Company-specific advice (Amazon, Google, TCS, Infosys, etc.)
- Coding challenges
- Study planning and roadmaps

Be concise, friendly, motivating, and practical. Format responses clearly using bullet points or numbered lists where helpful. Keep answers focused and actionable.`;

router.post("/chat", async (req, res) => {
  const { message, history } = req.body ?? {};

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Message is required" });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Missing GROQ_API_KEY on server" });
  }

  const mappedHistory = Array.isArray(history)
    ? history
        .filter((m) => m && typeof m.text === "string" && (m.role === "user" || m.role === "ai"))
        .map((m) => ({ role: m.role === "ai" ? "assistant" : "user", content: m.text }))
    : [];

  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...mappedHistory,
    { role: "user", content: message.trim() },
  ];

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
        messages,
        temperature: 0.4,
        max_tokens: 800,
      }),
    });

    if (!response.ok) {
      const details = await response.text();
      return res.status(response.status).json({ error: "Groq API request failed", details });
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return res.status(502).json({ error: "Groq returned an empty response" });
    }

    return res.json({ reply });
  } catch (error) {
    console.error("Groq API error:", error);
    return res.status(500).json({ error: "Failed to contact Groq API" });
  }
});

export default router;
