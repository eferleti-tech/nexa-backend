import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend Nexa rodando com sucesso");
});

app.post("/api/prospect/people", async (req, res) => {
  try {
    const response = await fetch(
      "https://api.apollo.io/v1/contacts/search",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.APOLLO_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(req.body)
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar leads no Apollo" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
