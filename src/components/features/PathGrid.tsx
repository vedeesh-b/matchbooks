import { Card } from "@/components/ui/card";
import type { Book } from "./SearchBar";
import { Button } from "../ui/button";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { getAmazonLink } from "@/lib/getAmazonLink";

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
            src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
            alt={book.title}
            className="h-full w-auto object-contain shadow-sm transition-transform group-hover:scale-105"
            onLoad={() => setImageLoaded(true)}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: imageLoaded ? 1 : 0, x: imageLoaded ? 0 : -15 }}
            transition={{ duration: 0.3 }}
          />
          {/* <Badge className="absolute top-1 left-5 bg-white/90 text-neutral-800 shadow-sm bg-cyan-100">
                By Author
              </Badge> */}
        </div>
        <div className="flex flex-1 flex-col  text-center">
          <h3 className="line-clamp-2 text-lg font-semibold leading-tight text-gray-900">
            {book.title.length > 25
              ? `${book.title.slice(0, 25)}...`
              : book.title}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
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
              className="w-[50%] py-4 hover:bg-amber-300 rounded-sm"
              data-icon="inline-start"
            >
              <ExternalLink />
              Buy on Amazon
            </Button>
          </a>
        </div>
      </Card>
    </motion.div>
  );
};

export default function PathGrid({ books }: { books: Book[] }) {
  return (
    <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-12">
      {books.length > 0 ? (
        books.map((book) => <PathCard book={book} />)
      ) : (
        <div>No books found.</div>
      )}
    </motion.div>
  );
}
