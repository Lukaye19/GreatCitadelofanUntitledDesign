import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send("Stockfish proxy is running!"));

app.post("/stockfish", async (req, res) => {
  try {
    const response = await fetch("https://chess-api.com/v1", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const text = await response.text();
    let data;
    try { data = JSON.parse(text); } catch { data = text; }

    res.status(response.status).json(data);
  } catch (e) {
    console.error("Proxy error:", e);
    res.status(500).json({ error: e.message });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Chess API proxy running on port ${PORT}`);
});
