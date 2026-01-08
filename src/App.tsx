import { useState, type ChangeEvent, type FormEvent } from "react";
import "./index.css";
import Home from "./pages/Home";

function App() {
  const [subject, setSubject] = useState("");
  const [books, setBooks] = useState<{ title: string }[]>([]);
  const [queryResults, setQueryResults] = useState<{ title: string }[]>([]);

  const BASE_URL = "https://openlibrary.org";

  async function fetchBooksBySubject(subject: string) {
    const res = await fetch(
      `${BASE_URL}/search.json?q=${subject}&subject=sport`
    );
    return res.json();
  }

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const keystrokes = e.target.value;
    setSubject(keystrokes);
    const sub = "self-help";
    if (keystrokes.length > 2) {
      const queryResults = await fetch(
        `${BASE_URL}/search.json?q=${e.target.value}&subject=${sub}&limit=8`
      );
      const data = await queryResults.json();
      setQueryResults(data.docs);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (subject !== "") {
      const data = await fetchBooksBySubject(subject);
      setBooks(data.works);
      console.log(data);
    }
  };

  return (
    <>
      {/* <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="subject-input"
          name="subject-input"
          value={subject}
          onChange={handleChange}
        />
        <label htmlFor="subject-input">Subject</label>
        <div>{queryResults.map((query) => query.title)}</div>
        <button type="submit">Search</button>
      </form>
      <div>{books.map((book) => book.title)}</div> */}
      <Home />
    </>
  );
}

export default App;
