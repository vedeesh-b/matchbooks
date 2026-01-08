import { useState, type ChangeEvent, type FormEvent } from "react";
import { useFetchBooks } from "../hooks/useFetchBooks";
import "./components.css";

export default function QueryInput() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (query !== "" && query.length > 2) {
      useFetchBooks({ inputQuery: query }).then((data) => {
        setResults(data);
        console.log(data);
      });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <form id="input-form" onSubmit={handleSubmit}>
        <div id="input-container">
          <input
            type="text"
            placeholder="What vibes are you looking for? Eg: a fiction novel placed in nineteenth-century Paris."
            value={query}
            onChange={handleChange}
          />
          <button id="form-submit" type="submit">
            Search
          </button>
        </div>
      </form>
      <div>
        {results?.map((book: { key: string; title: string }) => (
          <div key={book.key}>{book.title}</div>
        ))}
      </div>
    </>
  );
}
