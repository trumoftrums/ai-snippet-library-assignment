import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) throw new Error("❌ Missing MONGODB_URI environment variable");

export async function connectDB(): Promise<mongoose.Connection> {
  const conn = await mongoose.connect(MONGODB_URI, { dbName: "ai_snippet_db" });
  console.log("✔ MongoDB connected");
  return conn.connection;
}
