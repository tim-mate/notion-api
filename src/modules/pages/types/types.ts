export enum BlockTypeEnum {
  BigHeading = "h1",
  MediumHeading = "h2",
  SmallHeading = "h3",
  Text = "text",
  Table = "table",
}

export type BlockTypeAlias = "h1" | "h2" | "h3" | "text" | "table";

interface TextStyles {
  color: string;
  backgroundColor: string;
  bold: boolean;
  italic: boolean;
  underlined: boolean;
  strikethrough: boolean;
}

interface HeadingPayload extends TextStyles {
  content: string;
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

export type BlockPayload = HeadingPayload | TextBlockPayload | TableBlockPayload;
