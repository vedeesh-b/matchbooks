import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookSearchApi = createApi({
  reducerPath: "bookSearchApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://openlibrary.org/" }),
  keepUnusedDataFor: 300,
  endpoints: (builder) => ({
    searchBooks: builder.query({
      query: (query: string) => {
        return `search.json?q=${encodeURIComponent(query)}&limit=10&fields=title,author_name,cover_i,ratings_average,ratings_count,isbn,subject,key`;
      },
    }),

    getBooksBySubject: builder.query({
      query: ({ subject, offset }) => {
        return `subjects/${subject}.json?limit=6&offset=${offset}`;
      },
    }),

    getCollectionByQuery: builder.query({
      query: (query: string) => {
        return `search.json?q=${encodeURIComponent(query)}&limit=3&sort=rating`;
      },
    }),
  }),
});

export const {
  useSearchBooksQuery,
  useGetCollectionByQueryQuery,
  useLazySearchBooksQuery,
  useLazyGetBooksBySubjectQuery,
} = bookSearchApi;
