"use client";

import { useState } from "react";
import Link from "next/link";
import { SnippetType } from "@/types";

export default function SnippetListClient({initialSnippets}: {initialSnippets: SnippetType[]}) {
  const [snippets, setSnippets] = useState(initialSnippets);
  const [search, setSearch] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/snippets?search=${encodeURIComponent(search)}`);
    const data = await res.json();
    setSnippets(data);
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="mb-6">
        <input
          type="text"
          placeholder="Search title..."
          className="border px-4 py-2 rounded w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <div className="overflow-x-auto shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-400">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">
                Title
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">
                Body
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">
                Created At
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {snippets.map((snippet: SnippetType, index: number) => (
              <tr
                key={snippet._id}
                className={`hover:bg-gray-50 ${
                  index % 2 === 0 ? "bg-gray-50" : ""
                }`}
              >
                <td className="px-6 py-4">
                  <Link
                    href={`/snippets/${snippet._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {snippet.title}
                  </Link>
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {snippet.body.slice(0, 100)}
                  {snippet.body.length > 100 && "..."}
                </td>

                <td className="px-6 py-4 text-gray-400 text-sm">
                  {new Date(snippet.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
