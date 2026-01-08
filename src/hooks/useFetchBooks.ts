export type BookQueryProps = {
  inputQuery: string;
  subjects?: string[];
};

export async function useFetchBooks({ inputQuery, subjects }: BookQueryProps) {
  const BASE_URL = "https://openlibrary.org";
  const response = await fetch(
    `${BASE_URL}/search.json?q=${inputQuery}&limit=10${
      subjects ? `&subject=${subjects.join(",")}` : ""
    }`
  );
  const data = await response.json();
  return data.docs;
}
