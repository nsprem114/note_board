import express from "express";
import noteRouter from "./routes/noteRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";

dotenv.config({ path: "./src/.env" });

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", noteRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`);
  });
});
