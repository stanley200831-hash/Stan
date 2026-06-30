export interface InfoboxRow {
  label: string;
  value: string;
  isLink?: boolean;
}

export interface Infobox {
  wordmarkUrl?: string;
  imageUrl?: string;
  imageCaption?: string;
  rows: InfoboxRow[];
}

export interface ArticleSection {
  title: string;
  content: string; // Markdown or plain text
}

export interface TableRow {
  [key: string]: string;
}

export interface TableSection {
  headers: string[];
  rows: TableRow[];
}

export interface Article {
  id: string;
  title: string;
  description: string;
  infobox?: Infobox;
  summary: string[];
  sections: ArticleSection[];
  resultsTable?: TableSection; // Optional custom table (like the Results section)
}

export interface SavedArticle {
  id: string;
  title: string;
  description: string;
  savedAt: string;
}

export interface HistoryItem {
  id: string;
  query: string;
  timestamp: string;
}

export type BottomTab = "article" | "contents" | "history" | "saved";

