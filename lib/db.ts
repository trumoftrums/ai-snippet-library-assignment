import mongoose from "mongoose";

const mongoUri = process.env.MONGODB_URI!;
if (!mongoUri) throw new Error("Missing MONGODB_URI environment variable");

export async function connectDB(): Promise<mongoose.Connection> {
  const conn = await mongoose.connect(mongoUri, { dbName: "ai_snippet_db" });
  console.log("MongoDB connected");
  return conn.connection;
}
