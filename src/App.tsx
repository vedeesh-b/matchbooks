import { useState, type FormEvent } from "react";
import "./App.css";

function App() {
  const [subject, setSubject] = useState("");
  const [books, setBooks] = useState<{ title: string }[]>([]);
  const BASE_URL = "https://openlibrary.org";

  async function fetchBooksBySubject(subject: string) {
    const res = await fetch(`${BASE_URL}/subjects/${subject}.json?limit=30`);
    return res.json();
  }

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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="subject-input"
          name="subject-input"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <label htmlFor="subject-input">Subject</label>
        <button type="submit">Search</button>
      </form>
      <div>{books.map((book) => book.title)}</div>
    </>
  );
}

export default App;
