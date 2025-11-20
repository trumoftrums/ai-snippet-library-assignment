import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Snippet from "@/lib/models/Snippet";

export async function GET() {
  await connectDB();
  try {
    const snippets = await Snippet.find().sort({ createdAt: -1 });
    return NextResponse.json(snippets);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
