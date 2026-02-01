import type { Book } from "@/types";

export function calculateSubjectScore(seed: Book, candidate: Book): number {
  if (!seed.subject || !candidate.subject) return 0;

  const seedSubjects = new Set(
    seed.subject.map((subject) => subject.toLowerCase()),
  );
  const candidateSubjects = new Set(
    candidate.subject.map((subject) => subject.toLowerCase()),
  );

  let subjectIntersection = 0;
  candidateSubjects.forEach((sub) => {
    if (seedSubjects.has(sub)) {
      subjectIntersection++;
    }
  });

  const union =
    seedSubjects.size + candidateSubjects.size - subjectIntersection;
  return union === 0 ? 0 : subjectIntersection / union;
}

export function scoreCandidates(seed: Book, candidates: Book[]) {
  const candidatesScore = candidates.map((book) => {
    const isAuthorMatch = seed.author_name?.some((author) =>
      book.author_name?.includes(author),
    );
    const authorScore = isAuthorMatch ? 0.5 : 0;

    const subjectScore = calculateSubjectScore(seed, book);
    const totalScore = authorScore + subjectScore;

    return { ...book, _score: totalScore };
  });

  return candidatesScore
    .filter((book) => book.key != seed.key && book._score > 0.3)
    .sort((book1, book2) => book2._score - book1._score);
}
