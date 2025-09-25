import React, { useState, useEffect } from "react";
import "../css/book.css";

function BookFinder() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const defaultTopics = [
    "harry potter",
    "lord of the rings",
    "pride and prejudice",
    "the hobbit",
    "to kill a mockingbird",
    "the alchemist",
    "the great gatsby",
    "sherlock holmes",
    "the da vinci code",
    "game of thrones"
  ];

 
  const fetchBooks = async (title) => {
    try {
      const res = await fetch(`https://openlibrary.org/search.json?title=${title}`);
      const data = await res.json();
      return data.docs.slice(0, 5); 
    } catch (err) {
      return [];
    }
  };


useEffect(() => {
  const loadDefaultBooks = async () => {
    setLoading(true);
    setError("");
    setBooks([]);

    try {
      const promises = defaultTopics.map((topic) => fetchBooks(topic));
      const resultsArray = await Promise.all(promises);

      let results = resultsArray.flat();

      results = results.sort(() => Math.random() - 0.5);

      results = results.slice(0, 18);

      setBooks(results);
    } catch {
      setError("Failed to load default books.");
    } finally {
      setLoading(false);
    }
  };

  loadDefaultBooks();
}, []);

  
  const searchBooks = async (e) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);
    setError("");
    setBooks([]);

    try {
      const res = await fetch(`https://openlibrary.org/search.json?title=${query}`);
      const data = await res.json();
      if (data.docs.length === 0) {
        setError("No books found. Try another title.");
      } else {
        setBooks(data.docs.slice(0, 20));
      }
    } catch (err) {
      setError("Failed to fetch books. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>📚 Book Finder</h1>
      <form onSubmit={searchBooks} className="search-form">
        <input
          type="text"
          placeholder="Enter book title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p className="info">Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="books">
       {books.map((book, index) => {
  const coverId = book.cover_i;
  let coverUrl = "https://via.placeholder.com/150x200?text=No+Cover";

  if (coverId) {
    coverUrl = `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
  } else if (book.isbn && book.isbn.length > 0) {
    coverUrl = `https://covers.openlibrary.org/b/isbn/${book.isbn[0]}-M.jpg`;
  }

  return (
    <div className="book-card" key={index}>
      <img src={coverUrl} alt={book.title} />
      <h3>{book.title}</h3>
      <p>
        <strong>Author:</strong>{" "}
        {book.author_name ? book.author_name.join(", ") : "Unknown"}
      </p>
      <p>
        <strong>First Published:</strong> {book.first_publish_year || "N/A"}
      </p>
    </div>
  );
})}

      </div>
    </div>
  );
}

export default BookFinder;
