import Snippet from "@/lib/models/Snippet";
import Transformation from "@/lib/models/Transformation";
import { ObjectId } from "mongodb";
import { connectDB } from "@/lib/db";
import Link from "next/link";
import ClientTransform from "@/components/ClientTransform";
import { SnippetType, TransformationType } from "@/types";

type Params = {
    params: { id: string };
};

export default async function SnippetDetailPage({ params }: Params) {
    const { id } = await params;
    await connectDB();
    const snippet: SnippetType | null = await Snippet.findById(id);
    if (!snippet) return <p>Snippet not found</p>;
    const transformations: TransformationType[] = await Transformation.find({ snippetId: new ObjectId(id) }).sort({ createdAt: -1 });

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">{snippet.title}</h1>
                <Link
                    href="/"
                    className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400 transition"
                >
                    Back
                </Link>
            </div>
            <p className="mb-6 text-gray-700 whitespace-pre-line">{snippet.body}</p>
            <ClientTransform snippetId={id} />
            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-2">Transformation History</h2>

                {transformations.length === 0 ? (
                    <p className="text-gray-500">No transformations yet.</p>
                ) : (
                    <div className="overflow-x-auto shadow">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-400">
                                <tr>
                                    <th className="px-6 py-3 text-left text-gray-700 font-semibold">Type</th>
                                    <th className="px-6 py-3 text-left text-gray-700 font-semibold">Input</th>
                                    <th className="px-6 py-3 text-left text-gray-700 font-semibold">Output</th>
                                    <th className="px-6 py-3 text-left text-gray-700 font-semibold">Timestamp</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {transformations.map((tran, index) => (
                                    <tr
                                        key={tran._id}
                                        className={`hover:bg-gray-50 ${index % 2 === 0 ? "bg-gray-50" : ""} transition`}
                                    >
                                        <td className="px-6 py-4 text-gray-800">{tran.type}</td>
                                        <td className="px-6 py-4 text-gray-600">
                                            {tran.input.length > 100 ? tran.input.slice(0, 100) + "..." : tran.input}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            {tran.output.length > 100 ? tran.output.slice(0, 100) + "..." : tran.output}
                                        </td>
                                        <td className="px-6 py-4 text-gray-400 text-sm">
                                            {new Date(tran.createdAt).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
