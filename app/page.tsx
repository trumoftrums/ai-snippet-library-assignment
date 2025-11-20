import Link from "next/link";
import { SnippetType } from "@/types";


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
      {snippets.length === 0 ? (
        <p className="text-gray-600">No snippets yet. Create one!</p>
      ) : (
        <div className="overflow-x-auto shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-400">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Title</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Body</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Created At</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {snippets.map((snippet, index) => (
                <tr
                  key={snippet._id}
                  className={`hover:bg-gray-50 ${index % 2 === 0 ? "bg-gray-50" : ""} cursor-pointer transition`}
                >
                  <td className="px-6 py-4 text-gray-800">
                    <Link href={`/snippets/${snippet._id}`} className="hover:underline text-blue-600">
                      {snippet.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {snippet.body.length > 100 ? snippet.body.slice(0, 100) + "..." : snippet.body}
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm">
                    {new Date(snippet.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
