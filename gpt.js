export default async function handler(req, res) {
  const apiKey = process.env.OPENAI_API_KEY;

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
