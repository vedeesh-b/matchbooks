import { useGetCollectionByQueryQuery } from "@/services/bookSearchApi";
import type { Book } from "@/types";
import { PathCard } from "./PathGrid";
import styled from "styled-components";

const ResponsiveGrid = styled.div`
  display: grid;
  gap: 1.5rem;

  grid-template-columns: repeat(1, minmax(0, 1fr));

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

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
      <ResponsiveGrid>
        {books.slice(0, 4).map((book: Book) => (
          <div key={book.key} className="group cursor-pointer">
            <PathCard book={book} />
          </div>
        ))}
      </ResponsiveGrid>
    </>
  );
}
