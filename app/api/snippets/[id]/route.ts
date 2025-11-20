import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Snippet from "@/lib/models/Snippet";

type Params = {
  params: { id: string };
};

export async function GET(_req: Request, { params }: Params) {
  await connectDB();
  try {
    const snippet = await Snippet.findById(params.id);
    if (!snippet) {
      return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
    }
    return NextResponse.json(snippet);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
