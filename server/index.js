import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import { connectDB } from "./db.js";
import usersRouter from "./routes/users.js";
import aiRouter from "./routes/ai.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ────────────────────────────────────────────────
// Allow multiple CORS origins (localhost and network IP)
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests from localhost, 127.0.0.1, and any local network IP
    const allowedPatterns = [
      /^http:\/\/localhost(:\d+)?$/,
      /^http:\/\/127\.0\.0\.1(:\d+)?$/,
      /^http:\/\/192\.168\.(.*?)(:\d+)?$/,  // Local network 192.168.x.x
      /^http:\/\/10\.(.*?)(:\d+)?$/,        // Local network 10.x.x.x
    ];

    if (!origin || allowedPatterns.some(pattern => pattern.test(origin))) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  credentials: true,
}));
app.use(express.json());

// ── Routes ────────────────────────────────────────────────────
app.use("/api/users", usersRouter);
app.use("/api/ai", aiRouter);

// Health-check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ── Start ─────────────────────────────────────────────────────
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
});
