import type { Book } from "@/types";

export function getAmazonLink(book: Book) {
  const BASE_URL = `https://www.amazon.co.uk/s`;
  if (book.isbn && book.isbn.length > 0) {
    return `${BASE_URL}?k=${book.isbn[0]}`;
  }
  const cleanTitle = book.title.split(":")[0].trim();
  const author = book.author_name?.[0] || "";
  const query = encodeURIComponent(`${cleanTitle} ${author}`);

  return `${BASE_URL}?k=${query}`;
}
