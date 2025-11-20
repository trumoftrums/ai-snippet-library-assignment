export type SnippetType = {
  _id: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
};

export type TransformationType = {
  _id: string;
  snippetId: string;
  type: string;
  input: string;
  output: string;
  createdAt: string;
  updatedAt: string;
};
