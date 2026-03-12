import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

// Always load .env from the project root (one level above /server)
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("❌ MONGODB_URI is not defined in your .env file");
}

const client = new MongoClient(uri);

let db;

export async function connectDB() {
  if (db) return db; // Return existing connection if already connected

  try {
    await client.connect();
    db = client.db(process.env.DB_NAME || "placement_training");
    console.log(`✅ Connected to MongoDB — Database: "${db.databaseName}"`);
    return db;
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
}

export function getDB() {
  if (!db) {
    throw new Error("Database not initialised. Call connectDB() first.");
  }
  return db;
}

export { client };
