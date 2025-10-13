import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/stockfish", async (req, res) => {
  console.log("Incoming request:", req.body);

  try {
    const response = await fetch("https://chess-api.com/v1", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    console.log("Chess API response:", data);
    res.json(data);
  } catch (e) {
    console.error("Proxy error:", e);
    res.status(500).json({ error: e.message });
  }
});

const PORT = 3000;
app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));
