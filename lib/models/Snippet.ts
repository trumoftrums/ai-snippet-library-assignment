import { Schema, model, models, InferSchemaType } from "mongoose";

const SnippetSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
}, {
  timestamps: true,
  versionKey: false,
  collection: "snippets"
});

export type SnippetType = InferSchemaType<typeof SnippetSchema>;

export default models.Snippet || model<SnippetType>("Snippet", SnippetSchema);
