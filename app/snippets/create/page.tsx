"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateSnippetPage() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ title?: string; body?: string }>({});
    const router = useRouter();

    const handleCreate = async () => {
        const newErrors: { title?: string; body?: string } = {};
        if (!title.trim()) newErrors.title = "Title is required";
        if (!body.trim()) newErrors.body = "Body is required";
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;
        setLoading(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/snippet`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, body }),
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data?.error || "Failed to create snippet");
            }
            router.push("/");
        } catch (err: unknown) {
            if (err instanceof Error) setErrors({ title: err.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Create New Snippet</h1>
            <div className="mb-4 p-6 border rounded-lg bg-gray-50 shadow-sm">
                <label className="block mb-2 font-semibold">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={`w-full p-2 mb-1 border rounded focus:outline-none focus:ring-2 ${errors.title ? "focus:ring-red-400 border-red-500" : "focus:ring-blue-400"
                        }`}
                />
                {errors.title && <p className="text-red-500 mb-2">{errors.title}</p>}
                <label className="block mb-2 font-semibold">Body</label>
                <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className={`w-full p-2 mb-1 border rounded focus:outline-none focus:ring-2 ${errors.body ? "focus:ring-red-400 border-red-500" : "focus:ring-blue-400"
                        }`}
                    rows={6}
                />
                {errors.body && <p className="text-red-500 mb-2">{errors.body}</p>}
                <button
                    onClick={handleCreate}
                    disabled={loading}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50 transition cursor-pointer mt-2"
                >
                    {loading ? "Creating..." : "Create Snippet"}
                </button>
            </div>
        </div>
    );
}
