import React, { useState } from "react";
import api from "../services/api";
import "../styles/search.css";

function SearchBook() {
  const [query, setQuery] = useState({ title: "", author: "", publisher: "" });
  const [books, setBooks] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await api.get("/reader/search-book", {
        params: query,
      });
      setBooks(response.data);
    } catch (err) {
      console.error("Failed to search books");
    }
  };

  return (
    <div className="search-container">
      <h2>Search Book</h2>
      <form onSubmit={handleSearch}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={query.title}
            onChange={(e) => setQuery({ ...query, title: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Author</label>
          <input
            type="text"
            value={query.author}
            onChange={(e) => setQuery({ ...query, author: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Publisher</label>
          <input
            type="text"
            value={query.publisher}
            onChange={(e) => setQuery({ ...query, publisher: e.target.value })}
          />
        </div>
        <button type="submit">Search</button>
      </form>
      <div className="book-list">
        {books.map((book) => (
          <div key={book.isbn} className="book-item">
            <h3>{book.title}</h3>
            <p>Author: {book.authors}</p>
            <p>Publisher: {book.publisher}</p>
            <p>Available Copies: {book.availableCopies}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchBook;