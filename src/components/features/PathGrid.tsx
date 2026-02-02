import { Card } from "@/components/ui/card";
import type { Book } from "@/types";
import { Button } from "../ui/button";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { getAmazonLink } from "@/lib/getAmazonLink";
import styled from "styled-components";

const GridContainer = styled(motion.div)`
  display: grid;
  padding-top: 3rem;
  padding-bottom: 3rem;
  gap: 1.5rem;

  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const buttonText = "Buy on Amazon";

const cardVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
} as const;

export const PathCard = ({ book }: { book: Book }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div variants={cardVariants} key={book.key}>
      <Card
        key={book.key}
        className="group relative flex flex-col overflow-hidden bg-white transition-shadow border-0.5 border-neutral-900 rounded-none"
      >
        <div className="relative flex h-64 w-full items-center justify-center p-6">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-neutral-100 animate-pulse" />
          )}
          <motion.img
            src={
              book.cover_i
                ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                : "/placeholder.png"
            }
            alt={book.title}
            className="h-full w-auto object-contain shadow-sm transition-transform group-hover:scale-105"
            onLoad={() => setImageLoaded(true)}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: imageLoaded ? 1 : 0, x: imageLoaded ? 0 : -15 }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="flex flex-1 flex-col text-center">
          <h3 className="line-clamp-2 text-lg font-semibold leading-tight text-gray-900 px-2">
            {book.title.length > 25
              ? `${book.title.slice(0, 25)}...`
              : book.title}
          </h3>
          <p className="mt-1 text-sm text-gray-500 pb-2">
            by {book.author_name?.[0] ?? "Unknown"}
          </p>
        </div>
        <div className="pb-4">
          <a
            href={getAmazonLink(book)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center"
          >
            <Button
              variant={"secondary"}
              className="w-[80%] md:w-[60%] py-4 hover:bg-amber-300 rounded-sm"
              data-icon="inline-start"
            >
              <ExternalLink />
              {buttonText}
            </Button>
          </a>
        </div>
      </Card>
    </motion.div>
  );
};

export default function PathGrid({ books }: { books: Book[] }) {
  return (
    <GridContainer>
      {books?.map((book) => (
        <PathCard key={book.key} book={book} />
      ))}
    </GridContainer>
  );
}
