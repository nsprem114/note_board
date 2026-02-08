import express from "express";
import noteRouter from "./routes/noteRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";

dotenv.config({ path: "./src/.env" });

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

app.use(express.json());
app.use(rateLimiter);

if (process.env.NOTD_ENV !== "production") {
  app.use(cors());
}

app.use("/api/notes", noteRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../forntend/dist")));
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../forntend", "dist", "index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`);
  });
});
