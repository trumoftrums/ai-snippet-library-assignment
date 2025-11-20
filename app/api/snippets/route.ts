import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Snippet from "@/lib/models/Snippet";

export async function GET(req: Request) {
  await connectDB();

  try {
    const url = new URL(req.url);
    const search = url.searchParams.get("search") || "";
    const filter = search ? { title: { $regex: search, $options: "i" } } : {};
    const snippets = await Snippet.find(filter).sort({ createdAt: -1 });

    return NextResponse.json(snippets);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
