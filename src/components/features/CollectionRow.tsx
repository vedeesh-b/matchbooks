import { useGetCollectionByQueryQuery } from "@/services/bookSearchApi";
import type { Book } from "@/types";
import { PathCard } from "./PathGrid";

type CollectionRowProps = {
  title: string;
  description: string;
  query: string;
};

export default function CollectionRow({
  title,
  description,
  query,
}: CollectionRowProps) {
  const { data, isLoading } = useGetCollectionByQueryQuery(query);
  const books = data?.docs || [];

  if (isLoading)
    return (
      <div className="h-64 w-full bg-neutral-50 animate-pulse rounded-lg" />
    );
  if (books.length === 0) return null;

  return (
    <>
      <div className="pb-8">
        <h3 className="text-2xl font-medium tracking-tight pb-2 pt-14">
          {title}
        </h3>
        <p className="text-gray-600">{description}</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {books.slice(0, 4).map((book: Book) => (
          <div key={book.key} className="group cursor-pointer">
            <PathCard book={book} />
          </div>
        ))}
      </div>
    </>
  );
}
