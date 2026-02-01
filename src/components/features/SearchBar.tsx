import { useState, type ChangeEvent } from "react";
import { useDebounce } from "@/hooks/useDebounce";

import { useSearchBooksQuery } from "@/services/bookSearchApi";

import { Field } from "../ui/field";
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxList,
  ComboboxItem,
} from "../ui/combobox";
import { Button } from "../ui/button";
import { Item, ItemTitle, ItemDescription, ItemMedia } from "../ui/item";
import { Badge } from "../ui/badge";
import { BadgePlus, BookAlert, Shuffle, Star } from "lucide-react";
import { Spinner } from "../ui/spinner";
import type { Book } from "@/types";

export type SearchBarProps = {
  generatePath: (seed: Book) => Promise<void>;
  generateRandomPath: () => Promise<void>;
  isGenerating: boolean;
};

export default function SearchBar({
  generatePath,
  generateRandomPath,
  isGenerating,
}: SearchBarProps) {
  const [searchValue, setSearchValue] = useState("");
  const [bookFound, setBookFound] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [lastGeneratedKey, setLastGeneratedKey] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!selectedBook) {
      await generateRandomPath();
      setSearchValue("");
      return;
    }

    if (selectedBook.key === lastGeneratedKey) return;

    await generatePath(selectedBook);
    setLastGeneratedKey(selectedBook.key);
  };

  const debouncedSearchValue = useDebounce({
    value: searchValue,
    delay: 200,
  });

  const { data, isFetching } = useSearchBooksQuery(debouncedSearchValue, {
    skip: debouncedSearchValue.length < 2,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setSearchValue(input);
    setSelectedBook(null);
    setBookFound(false);
    if (input === "") {
    }
  };

  const isDuplicateSelection = selectedBook?.key === lastGeneratedKey;
  const isDisabled = isGenerating || (bookFound && isDuplicateSelection);

  return (
    <>
      <Field orientation="horizontal" className="flex gap-4">
        <div className="relative w-full">
          <Combobox
            items={data?.docs}
            itemToStringValue={(book: Book) => book.title}
            onValueChange={(book: Book | null) => {
              if (book) {
                setSearchValue(book.title);
                setSelectedBook(book);
                setBookFound(true);
              }
            }}
          >
            <ComboboxInput
              placeholder="Search books..."
              value={searchValue}
              onChange={handleInputChange}
              className="h-12 py-2 px-2.5"
            />
            <ComboboxContent>
              {isFetching && (
                <div className="p-4 text-md text-gray-500 flex items-center justify-center gap-2">
                  <Spinner />
                  Searching...
                </div>
              )}
              {!isFetching &&
                debouncedSearchValue.length > 2 &&
                (!data?.docs || data.docs.length === 0) && (
                  <ComboboxEmpty className="p-6 flex items-center justify-center gap-2 text-sm">
                    <BookAlert />
                    No books found.
                  </ComboboxEmpty>
                )}
              {!isFetching && data?.docs?.length > 0 && (
                <ComboboxList>
                  {data?.docs?.map((book: Book) => (
                    <ComboboxItem key={book.key} value={book}>
                      <Item className="gap-6 items-stretch">
                        <ItemMedia
                          variant="image"
                          className="shrink-0 h-24 w-18"
                        >
                          <img
                            src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                            alt={book.title}
                            className="h-full w-full object-cover rounded-sm bg-neutral-200"
                          />
                        </ItemMedia>
                        <div className="flex flex-1 flex-col justify-between py-0.5 overflow-hidden">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <ItemTitle className="text-base mb-0.5">
                                {book.title}
                              </ItemTitle>
                              <div className="flex flex-row gap-2">
                                {book.ratings_average && (
                                  <Badge
                                    variant="secondary"
                                    className="gap-1 h-6 px-1.5 mt-0.5"
                                  >
                                    <Star />
                                    {book.ratings_average.toFixed(1)}
                                  </Badge>
                                )}
                                {book.ratings_count && (
                                  <Badge
                                    variant="outline"
                                    className="gap-1 h-6 px-1.5 mt-0.5"
                                  >
                                    {`${book.ratings_count} ratings`}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          <ItemDescription>
                            {book.author_name?.[0] ?? "Unknown Author"}
                          </ItemDescription>
                        </div>
                      </Item>
                    </ComboboxItem>
                  ))}
                </ComboboxList>
              )}
            </ComboboxContent>
          </Combobox>
        </div>
        <Button
          className="w-40 py-2 h-12 px-3 cursor-pointer bg-neutral-700 hover:bg-neutral-800 hover:shadow-md"
          data-icon="inline-start"
          onClick={handleGenerate}
          disabled={isDisabled}
        >
          {isGenerating ? <Spinner /> : bookFound ? <BadgePlus /> : <Shuffle />}
          {bookFound ? "Generate Path" : "Surprise Me"}
        </Button>
      </Field>
    </>
  );
}
