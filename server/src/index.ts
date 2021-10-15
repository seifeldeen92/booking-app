import fs from "fs";
import path from "path";
import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

app.get("/api/time-slots", async (req, res) => {
  const dataBuffer = await fs.readFileSync(
    path.join(__dirname, "..", "/data/time_slots.json")
  );
  const dataJSON = JSON.parse(dataBuffer.toString());

  res.send(dataJSON);
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at https://localhost:${PORT}`);
});
