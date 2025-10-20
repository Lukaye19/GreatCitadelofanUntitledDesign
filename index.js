import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

app.get("/", (req, res) => res.send("Stockfish proxy is running!"));

app.post("/stockfish", async (req, res) => {
  try {
    const response = await fetch("https://chess-api.com/v1", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    let data;
    try {
      data = await response.json();
    } catch {
      data = await response.text();
    }

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
