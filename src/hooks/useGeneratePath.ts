import { type Book } from "@/components/features/SearchBar";
import { scoreCandidates } from "@/lib/bookScoring";
import { useLazySearchBooksQuery } from "@/services/bookSearchApi";
import { useState } from "react";

export function useGeneratePath() {
  const [triggerSearch, { isFetching }] = useLazySearchBooksQuery();
  const [readingPath, setReadingPath] = useState<Book[]>([]);

  const preloadImages = (books: Book[]) => {
    books.forEach((book) => {
      if (book.cover_i) {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
        document.head.appendChild(link);
      }
    });
  };

  const generateRandomPath = async () => {
    const popularSubjects = [
      "fiction",
      "mystery",
      "romance",
      "biography",
      "fantasy",
      "history",
      "business",
      "science_fiction",
    ];

    const randomSubject =
      popularSubjects[Math.floor(Math.random() * popularSubjects.length)];

    try {
      const results = await triggerSearch(`subject:${randomSubject}`).unwrap();
      console.log("results", results);
      const highlyRatedBooks: Book[] = results?.docs?.filter(
        (book: Book) => book.ratings_average >= 3.5,
      );
      const shuffled = highlyRatedBooks.sort(() => Math.random() - 0.5);
      const finalList = shuffled.slice(0, 6);
      preloadImages(finalList);
      setReadingPath(finalList);
    } catch (error) {
      console.error("Failed to generate random path", error);
    }
  };

  const generatePath = async (seed: Book) => {
    if (!seed) return;
    const subjectQuery = seed.subjects?.[0]
      ? `subject:${seed.subjects[0]}`
      : `author:${seed.author_name?.[0]}`;

    try {
      const results = await triggerSearch(subjectQuery).unwrap();
      const candidates = results.docs;
      const sortedPath = scoreCandidates(seed, candidates).slice(0, 6);
      preloadImages(sortedPath);
      setReadingPath(sortedPath);
    } catch (error) {
      console.error("Failed to generate reading path", error);
    }
  };

  return {
    generatePath,
    generateRandomPath,
    readingPath,
    isGenerating: isFetching,
  };
}
