import type { SearchResponse } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookSearchApi = createApi({
  reducerPath: "bookSearchApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://openlibrary.org/" }),
  keepUnusedDataFor: 300,
  endpoints: (builder) => ({
    searchBooks: builder.query<SearchResponse, string>({
      query: (query: string) => {
        return `search.json?q=${encodeURIComponent(query)}&limit=10&fields=title,author_name,cover_i,ratings_average,ratings_count,isbn,subject,key`;
      },
      transformResponse: (res: any): SearchResponse => {
        return {
          docs: res.docs || [],
        };
      },
    }),

    getBooksBySubject: builder.query<
      SearchResponse,
      { subject: string; offset: number }
    >({
      query: ({ subject, offset }) => {
        return `subjects/${subject}.json?limit=6&offset=${offset}`;
      },
      transformResponse: (response: any): SearchResponse => {
        const works = response.works || [];
        return {
          docs: works.map((work: any) => ({
            key: work.key,
            title: work.title,
            author_name: work.authors?.map((a: any) => a.name) || ["Unknown"],
            cover_i: work.cover_id,
            subject: [response.name],
          })),
        };
      },
    }),

    getCollectionByQuery: builder.query<SearchResponse, string>({
      query: (query: string) => {
        return `search.json?q=${encodeURIComponent(query)}&limit=3&sort=rating&fields=title,author_name,cover_i,isbn,subject,key`;
      },
      transformResponse: (res: any): SearchResponse => {
        return {
          docs: res.docs || [],
        };
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
