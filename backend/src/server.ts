import express from "express";
import path from "path";
import statsRouter from "./routes/Stats";
import settingsRouter from "./routes/Settings";
import { send } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());
//app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/api/stats", statsRouter);
app.use("/api/settings", settingsRouter);

app.listen(PORT, () => {
  console.log(`Serveur demarre sur http://localhost:${PORT}`);
});
