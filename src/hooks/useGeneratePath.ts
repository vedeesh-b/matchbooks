import type { Book } from "@/types";
import { scoreCandidates } from "@/lib/bookScoring";
import { setPath } from "@/lib/pathSlice";
import {
  useLazySearchBooksQuery,
  useLazyGetBooksBySubjectQuery,
} from "@/services/bookSearchApi";
import type { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";

export function useGeneratePath() {
  const dispatch = useDispatch();
  const readingPath = useSelector((state: RootState) => state.path.currentPath);
  const [triggerSearch, { isFetching: isSearching }] =
    useLazySearchBooksQuery();
  const [triggerSubjectSearch, { isFetching: isSubjectFetching }] =
    useLazyGetBooksBySubjectQuery();

  const isGenerating = isSearching || isSubjectFetching;

  const preloadImages = (books: Book[]) => {
    books.forEach((book) => {
      if (book.cover_i) {
        const img = new Image();
        img.src = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
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
    const randomOffset = Math.floor(Math.random() * 50);

    try {
      const results = await triggerSubjectSearch({
        subject: randomSubject,
        offset: randomOffset,
      }).unwrap();
      const books: Book[] = results.docs;
      preloadImages(books);
      dispatch(setPath(books));
    } catch (error) {
      console.error("Failed to generate random path", error);
    }
  };

  const generatePath = async (seed: Book) => {
    if (!seed) return;

    const rawSubject = seed.subject?.[0];
    const rawAuthor = seed.author_name?.[0];

    if (!rawSubject && !rawAuthor) {
      console.warn("No usable metadata");
      return;
    }

    let query = "";
    if (rawSubject) {
      query = `subject:"${rawSubject}"`;
    } else {
      query = `author:"${rawAuthor}"`;
    }
    try {
      const results = await triggerSearch(query).unwrap();
      const candidates = results.docs;
      const sortedPath = scoreCandidates(seed, candidates).slice(0, 6);
      console.log(candidates);
      preloadImages(sortedPath);
      dispatch(setPath(sortedPath));
    } catch (error) {
      console.error("Failed to generate reading path", error);
    }
  };

  return {
    generatePath,
    generateRandomPath,
    readingPath,
    isGenerating,
  };
}
