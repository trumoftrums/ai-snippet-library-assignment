import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Snippet from "@/lib/models/Snippet";

export async function POST(req: Request) {
  await connectDB();
  try {
    const body = await req.json();
    const { title, body: snippetBody } = body;

    if (!title || !snippetBody) {
      return NextResponse.json(
        { error: "Title and body are required" },
        { status: 400 }
      );
    }

    const snippet = await Snippet.create({
      title,
      body: snippetBody
    });

    return NextResponse.json(snippet, { status: 201 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
