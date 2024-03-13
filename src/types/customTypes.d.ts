export interface CustomError extends Error {
  status?: number;
  code?: number;
}

export type BlockType = "text" | "table";
