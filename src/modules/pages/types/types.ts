export enum BlockTypeEnum {
  Text = "text",
  Table = "table",
}

export type BlockTypeAlias = "text" | "table";

interface TextStyles {
  color: string;
  backgroundColor: string;
  bold: boolean;
  italic: boolean;
  underlined: boolean;
  strikethrough: boolean;
}

interface TextBlockPayload extends TextStyles {
  content: string;
}

interface TableBlockPayload {
  table: { text: string; styles: TextStyles }[][];
  styles: {
    rows: { color: string; backgroundColor: string }[];
    columns: { color: string; backgroundColor: string }[];
  };
  headerRow: boolean;
  headerColumn: boolean;
}

export type BlockPayload = TextBlockPayload | TableBlockPayload;
