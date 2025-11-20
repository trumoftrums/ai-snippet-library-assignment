import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Snippet from "@/lib/models/Snippet";
import Transformation from "@/lib/models/Transformation";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

type RequestBody = {
  snippetId: string;
  type: "summarise" | "rewrite" | "translate";
}

export async function POST(req: Request) {
  await connectDB();
  try {
    const { snippetId, type } = (await req.json()) as RequestBody;
    if (!snippetId || !type) {
      return NextResponse.json({ error: "snippetId and type are required" }, { status: 400 });
    }
    const snippet = await Snippet.findById(snippetId);
    if (!snippet) return NextResponse.json({ error: "Snippet not found" }, { status: 404 });

    let prompt = "";
    switch (type) {
      case "summarise":
        prompt = `Summarise this text in one short paragraph:\n${snippet.body}`;
        break;
      case "rewrite":
        prompt = `Rewrite this text in a more formal tone:\n${snippet.body}`;
        break;
      case "translate":
        prompt = `Translate this text to Spanish:\n${snippet.body}`;
        break;
      default:
        return NextResponse.json({ error: "Invalid transformation type" }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });
    const output = completion.choices[0]?.message?.content?.trim() || "";
    const transformation = await Transformation.create({
      snippetId: snippet._id,
      type,
      input: snippet.body,
      output,
    });

    return NextResponse.json(transformation);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
