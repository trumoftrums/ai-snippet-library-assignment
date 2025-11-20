import { Schema, model, models, InferSchemaType } from "mongoose";

const TransformationSchema = new Schema({
  snippetId: { type: Schema.Types.ObjectId, ref: "Snippet", required: true },
  type: { type: String, required: true },   // e.g., summarise | rewrite | translate
  input: { type: String, required: true },
  output: { type: String, required: true },
}, {
  timestamps: true,
  versionKey: false,
  collection: "transformations"
});

export type TransformationType = InferSchemaType<typeof TransformationSchema>;

export default models.Transformation || model<TransformationType>("Transformation", TransformationSchema);
