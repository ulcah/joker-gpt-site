export default async function handler(req, res) {
  const apiKey = process.env.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;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `You are the JOKER — a mischievous poker coach who gives one clever riddle, brainteaser, or trick question per day to sharpen players. Keep it under 300 characters.`
        }
      ],
      temperature: 0.9,
      max_tokens: 100
    })
  });

  const data = await response.json();
  const result = data.choices?.[0]?.message?.content?.trim() || "No JOKER today.";

  res.status(200).json({ joke: result });
}
export default async function handler(req, res) {
  const prompt = "Give me a clever poker-themed riddle or mind game.";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.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}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.9,
      }),
    });

    const data = await response.json();
    const message = data.choices?.[0]?.message?.content || "No response from AI";

    res.status(200).json({ joke: message });
  } catch (err) {
    console.error("GPT API error:", err);
    res.status(500).json({ joke: "The Joker ran into a problem. Try again later." });
  }
}
