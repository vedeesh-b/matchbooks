export type Book = {
  isbn: string;
  title: string;
  author_name: string[];
  cover_i?: number;
  ratings_average?: number;
  ratings_count?: number;
  subject?: string[];
  key: string;
};

export type SearchResponse = {
  docs: Book[];
};
