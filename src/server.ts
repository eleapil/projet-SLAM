import express from "express";
import path from "path";
import statsRouter from "./routes/Stats";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/api/stats", statsRouter);

app.listen(PORT, () => {
  console.log(`Serveur Cinema demarre sur http://localhost:${PORT}`);
});
