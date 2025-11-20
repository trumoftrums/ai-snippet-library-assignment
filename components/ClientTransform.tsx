"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  snippetId: string;
};

const TRANSFORM_TYPES = [
  { label: "Summarise", value: "summarise" },
  { label: "Rewrite (Formal)", value: "rewrite" },
  { label: "Translate to Spanish", value: "translate" },
];

export default function ClientTransform({ snippetId }: Props) {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState(TRANSFORM_TYPES[0].value);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleTransform = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai-transform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ snippetId, type: selectedType }),
      });
      const data = await res.json();
      setResult(data.output);
      router.refresh();
    } catch (err) {
      console.error(err);
      setResult("Error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-8 p-4 border rounded-lg bg-gray-50 shadow-sm">
      <h2 className="text-xl font-semibold mb-2">Run AI Transformation</h2>

      <select
        className="border p-2 rounded mb-4 w-full"
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
      >
        {TRANSFORM_TYPES.map((t) => (
          <option key={t.value} value={t.value}>
            {t.label}
          </option>
        ))}
      </select>

      <button
        onClick={handleTransform}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 cursor-pointer"
      >
        {loading ? "Processing..." : "Run"}
      </button>

      {result && (
        <div className="mt-4 p-3 bg-white border rounded">
          <h3 className="font-semibold mb-1">Result:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}
