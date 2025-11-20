import Link from "next/link";
import { SnippetType } from "@/types";
import SnippetListClient from "@/components/SnippetList";


export default async function SnippetListPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/snippets`, {
    cache: "no-store",
  });
  const snippets: SnippetType[] = await res.json();

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">AI Snippet Library</h1>
        <Link
          href="/snippets/create"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          + New Snippet
        </Link>
      </div>

      <SnippetListClient initialSnippets={snippets} />
    </div>
  );
}
