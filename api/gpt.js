module.exports = async function (req, res) {
  const prompt = `You are the JOKER — a mischievous poker coach who gives one cleverly formed poker situation per day to sharpen players. It should include what cards you have, whats on the board, and who has bet/checked/folded leading up to your turn. Keep it under 300 characters.


`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.9,
        max_tokens: 100,
      }),
    });

    const data = await response.json();
    const message = data.choices?.[0]?.message?.content?.trim() || "No JOKER today.";

    res.status(200).json({ joke: message });
  } catch (err) {
    console.error("GPT API error:", err);
    res.status(500).json({ joke: "The Joker ran into a problem. Try again later." });
  }
};
